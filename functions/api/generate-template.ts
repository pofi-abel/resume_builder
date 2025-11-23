// Cloudflare Pages Function for AI Template Generation
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Env {
  GEMINI_API_KEY: string;
}

type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

const TEMPLATE_SCHEMA = `{
  "id": "string (unique identifier)",
  "name": "string (template name)",
  "description": "string (brief description)",
  "theme": {
    "colors": {
      "primary": "string (hex color)",
      "secondary": "string (hex color)",
      "background": "string (hex color)",
      "text": "string (hex color)",
      "textMuted": "string (hex color)",
      "border": "string (hex color)",
      "sidebarText": "string (hex color, optional)"
    },
    "typography": {
      "fontFamily": "string (web-safe font)",
      "headingFamily": "string (web-safe font)",
      "baseSize": "string (e.g., '10pt')",
      "lineHeight": "string (e.g., '1.5')"
    },
    "spacing": {
      "sectionGap": "string (e.g., '2rem')",
      "itemGap": "string (e.g., '1rem')",
      "pagePadding": "string (e.g., '2.5cm')"
    }
  },
  "layout": {
    "type": "single-column" | "two-column",
    "columns": "string (e.g., '35% 1fr', only for two-column)",
    "sidebarPosition": "left" | "right" (only for two-column)
  },
  "structure": {
    "sidebar": ["array of section IDs, only for two-column"],
    "main": ["array of section IDs"]
  },
  "sectionVariants": {
    "personal-info": "default" | "centered" | "minimal",
    "summary": "default",
    "experience": "default" | "timeline" | "minimal" | "compact",
    "education": "default" | "minimal",
    "skills": "default" | "tags" | "bubbles" | "bullet-list" | "sidebar",
    "projects": "default" | "grid",
    "customSections": "default"
  }
}`;

const SYSTEM_PROMPT = `You are a professional resume template designer. Generate a complete TemplateConfig JSON based on the user's description.

SCHEMA:
${TEMPLATE_SCHEMA}

VALID SECTION IDS: personal-info, summary, experience, education, skills, projects, customSections

GUIDELINES:
1. Use appropriate color schemes that match the described style
2. Choose web-safe fonts (e.g., Inter, Roboto, Merriweather, Georgia, Arial)
3. Set reasonable spacing values (use rem or cm units)
4. Define logical section order
5. Assign suitable variants based on the style
6. For two-column layouts, put personal-info, skills, and education in sidebar
7. Ensure all colors are valid hex codes
8. Make the template visually appealing and professional

EXAMPLES:

User: "A modern template with blue accents and a sidebar"
Response: {
  "id": "custom-modern-blue",
  "name": "Modern Blue",
  "description": "Contemporary two-column layout with blue sidebar",
  "theme": {
    "colors": {
      "primary": "#2563eb",
      "secondary": "#2563eb",
      "background": "#ffffff",
      "text": "#1a1a1a",
      "textMuted": "#666666",
      "border": "#e0e0e0",
      "sidebarText": "#ffffff"
    },
    "typography": {
      "fontFamily": "Inter, sans-serif",
      "headingFamily": "Inter, sans-serif",
      "baseSize": "10pt",
      "lineHeight": "1.5"
    },
    "spacing": {
      "sectionGap": "2rem",
      "itemGap": "1rem",
      "pagePadding": "2rem"
    }
  },
  "layout": {
    "type": "two-column",
    "columns": "35% 1fr",
    "sidebarPosition": "left"
  },
  "structure": {
    "sidebar": ["personal-info", "skills", "education"],
    "main": ["summary", "experience", "projects", "customSections"]
  },
  "sectionVariants": {
    "personal-info": "default",
    "summary": "default",
    "experience": "default",
    "education": "default",
    "skills": "sidebar",
    "projects": "default",
    "customSections": "default"
  }
}

Now generate a template based on the user's description. Return ONLY valid JSON, no markdown or explanations.`;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { prompt } = await context.request.json() as { prompt: string };

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(
      SYSTEM_PROMPT + `\n\nUser request: ${prompt}`
    );

    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    // Parse and validate JSON
    const templateConfig = JSON.parse(jsonText);

    // Basic validation
    if (!templateConfig.id || !templateConfig.theme || !templateConfig.layout) {
      throw new Error('Invalid template structure');
    }

    return new Response(JSON.stringify(templateConfig), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Template generation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate template',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

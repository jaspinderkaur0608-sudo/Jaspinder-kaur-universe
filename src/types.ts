export interface World {
  id: string;
  title: string;
  subtitle: string;
  color: "blue" | "gold" | "purple" | "crimson" | "green";
  nebulaColor: string;
  challenge: string;
  thinking: string[];
  system: {
    name: string;
    description: string;
    architecture: string[];
    pipelines: string[];
    features: string[];
  };
  impact: {
    metrics: { label: string; value: string }[];
    evidence: string[];
  };
}

export interface Question {
  id: string;
  text: string;
  answer: string;
  x: number; // percentage in space
  y: number; // percentage in space
}

export interface CinematicStep {
  id: number;
  text: string;
  duration: number; // in ms
  animationType: "fade" | "scale" | "pulse" | "bigbang" | "none";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Send, 
  Image, 
  Sparkles,
  Lightbulb,
  BookOpen,
  ChevronRight,
  Upload,
  Zap
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const difficultyModes = [
  { id: "beginner", name: "Beginner", description: "Step-by-step basics" },
  { id: "average", name: "Average", description: "Standard approach" },
  { id: "advanced", name: "Advanced", description: "Competition level" },
];

const sampleQuestions = [
  "A ball is thrown vertically upward with velocity 20 m/s. Find maximum height.",
  "Balance the equation: Fe + O₂ → Fe₂O₃",
  "Find dy/dx if y = sin(x²)",
  "Explain the process of photosynthesis in plants",
];

export default function DoubtSolver() {
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("average");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setResponse(`**Solution for your question:**

Let me break this down step by step.

**Given:**
- Initial velocity (u) = 20 m/s
- Acceleration due to gravity (g) = -10 m/s² (taking upward as positive)
- Final velocity at maximum height (v) = 0 m/s

**Formula Used:**
Using the kinematic equation:
$$v² = u² + 2as$$

**Step-by-step Solution:**

**Step 1:** At maximum height, velocity becomes zero
$$0 = (20)² + 2(-10)(h)$$

**Step 2:** Solving for h
$$0 = 400 - 20h$$
$$20h = 400$$
$$h = 20 \\text{ meters}$$

**Answer:** Maximum height = **20 meters**

**Key Points to Remember:**
- Always take direction into account for vector quantities
- At maximum height, velocity is momentarily zero
- This is a frequently asked type in JEE Main

**Common Mistakes:**
- Forgetting the negative sign for g
- Confusing velocity with speed`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Powered by AI
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">AI Doubt Solver</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get instant step-by-step solutions with formulas and exam-oriented explanations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Ask Your Doubt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Difficulty Selector */}
                <div className="flex flex-wrap gap-2">
                  {difficultyModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setDifficulty(mode.id)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        difficulty === mode.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {mode.name}
                    </button>
                  ))}
                </div>

                {/* Question Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your question here... (e.g., 'Find the acceleration of a body of mass 5kg when a force of 20N is applied')"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                    <Button 
                      variant="hero" 
                      className="gap-2"
                      onClick={handleSubmit}
                      disabled={!question.trim() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Solving...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Get Solution
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Sample Questions */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Try these sample questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleQuestions.map((q, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion(q)}
                        className="text-xs"
                      >
                        {q.length > 40 ? q.substring(0, 40) + "..." : q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Area */}
            {response && (
              <Card className="animate-slide-up">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-success/5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Solution
                    <Badge variant="outline" className="ml-auto text-xs">
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose prose-sm max-w-none">
                    {response.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <h4 key={i} className="font-bold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                      }
                      if (line.startsWith('$$') && line.endsWith('$$')) {
                        return (
                          <div key={i} className="my-2 p-3 bg-secondary/50 rounded-lg font-mono text-center">
                            {line.replace(/\$\$/g, '')}
                          </div>
                        );
                      }
                      if (line.startsWith('- ')) {
                        return <li key={i} className="text-muted-foreground ml-4">{line.substring(2)}</li>;
                      }
                      return line ? <p key={i} className="text-muted-foreground">{line}</p> : <br key={i} />;
                    })}
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                    <Button variant="outline" size="sm">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Similar Questions
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Related Theory
                    </Button>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      👍 Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      👎 Not Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">AI Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Step-by-step solutions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Formula explanations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Common mistakes highlighted
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Exam shortcuts & tips
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Image question support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                  <p className="text-sm font-medium line-clamp-2">
                    Calculate the work done by a force F = (3i + 4j) N...
                  </p>
                  <span className="text-xs text-muted-foreground">Physics • 2 hours ago</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                  <p className="text-sm font-medium line-clamp-2">
                    Write the IUPAC name of CH₃-CH(OH)-CH₂-CHO
                  </p>
                  <span className="text-xs text-muted-foreground">Chemistry • 5 hours ago</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                  <p className="text-sm font-medium line-clamp-2">
                    Evaluate the integral ∫(sin x cos x) dx
                  </p>
                  <span className="text-xs text-muted-foreground">Maths • Yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6 text-center">
                <Image className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="font-bold mb-2">Image to Solution</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take a photo of your handwritten question and get instant solutions!
                </p>
                <Button variant="accent" className="w-full">
                  Upload Photo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

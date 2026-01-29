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
  Upload,
  Zap,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useDoubtSolver } from "@/hooks/useDoubtSolver";
import { SolutionRenderer } from "@/components/doubt-solver/SolutionRenderer";

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
  const { messages, isLoading, currentResponse, askQuestion, clearMessages } = useDoubtSolver();

  const handleSubmit = async () => {
    if (!question.trim() || isLoading) return;
    const q = question;
    setQuestion("");
    await askQuestion(q, difficulty);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop();
  const displayContent = currentResponse || lastAssistantMessage?.content;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Powered by OpenAI GPT-5
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
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Ask Your Doubt
                  </div>
                  {messages.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearMessages} className="text-muted-foreground">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
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
                    onKeyDown={handleKeyDown}
                    className="min-h-32 resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" className="gap-2" disabled>
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
                        disabled={isLoading}
                      >
                        {q.length > 40 ? q.substring(0, 40) + "..." : q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Area */}
            {displayContent && (
              <Card className="animate-slide-up">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-success/5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Solution
                    <Badge variant="outline" className="ml-auto text-xs">
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
                    </Badge>
                    {isLoading && (
                      <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <SolutionRenderer content={displayContent} />

                  {!isLoading && (
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
                  )}
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
                    OpenAI GPT-5 powered
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {messages.filter(m => m.role === 'user').slice(-3).map((msg, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                    <p className="text-sm font-medium line-clamp-2">
                      {msg.content}
                    </p>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                ))}
                {messages.filter(m => m.role === 'user').length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No questions asked yet. Try one above!
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6 text-center">
                <Image className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="font-bold mb-2">Image to Solution</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take a photo of your handwritten question and get instant solutions!
                </p>
                <Button variant="accent" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Atom, FlaskConical, Calculator, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const exams = [
  {
    id: "jee-main",
    name: "JEE Main",
    description: "For B.Tech / B.E. admission to NITs, IIITs & other institutes",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-primary to-primary/80",
    icon: Calculator,
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description: "For B.Tech admission to premier IITs",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-mathematics to-primary",
    icon: Atom,
  },
  {
    id: "neet",
    name: "NEET UG",
    description: "For MBBS, BDS & other medical courses",
    subjects: ["Physics", "Chemistry", "Biology"],
    color: "from-success to-biology",
    icon: Leaf,
  },
];

export function ExamSelector() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Choose Your Exam</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your target exam and get a personalized learning experience 
            tailored to the latest NTA syllabus and pattern
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {exams.map((exam) => {
            const Icon = exam.icon;
            return (
              <Card
                key={exam.id}
                className="group relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              >
                <div className={cn(
                  "absolute inset-0 opacity-5 bg-gradient-to-br",
                  exam.color
                )} />
                <CardContent className="p-6 relative">
                  <div className={cn(
                    "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                    exam.color
                  )}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-2">{exam.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{exam.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exam.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <Link to={`/learn?exam=${exam.id}`}>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      Start Preparing
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

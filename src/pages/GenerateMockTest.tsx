import { MockTestConfigForm } from "@/components/mock-test/MockTestConfigForm";
import { MockTestViewer } from "@/components/mock-test/MockTestViewer";
import { useMockTestGenerator } from "@/hooks/useMockTestGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function GenerateMockTest() {
  const { isGenerating, testData, generateTest, resetTest } = useMockTestGenerator();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {testData && (
          <Button variant="ghost" onClick={resetTest} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Configuration
          </Button>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Generating your mock test...</p>
            <p className="text-sm text-muted-foreground">This may take 15–30 seconds</p>
          </div>
        )}

        {!isGenerating && !testData && (
          <MockTestConfigForm onGenerate={generateTest} isGenerating={isGenerating} />
        )}

        {!isGenerating && testData && (
          <MockTestViewer testData={testData} onReset={resetTest} />
        )}
      </div>
    </div>
  );
}

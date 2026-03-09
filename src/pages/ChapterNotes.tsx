import { useSearchParams, useNavigate } from "react-router-dom";
import { useChapterNotes } from "@/hooks/useChapterNotes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Loader2, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useRef, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ChapterNotes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subject = searchParams.get("subject") || "";
  const chapter = searchParams.get("chapter") || "";
  const { isGenerating, notesData, generateNotes, resetNotes } = useChapterNotes();
  const notesRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (subject && chapter) generateNotes(subject, chapter);
  };

  const handleDownloadPDF = useCallback(async () => {
    if (!notesRef.current || !notesData) return;

    const canvas = await html2canvas(notesRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margin each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    const filename = `${notesData.subject}_${notesData.chapter}_Notes.pdf`.replace(/\s+/g, "_");
    pdf.save(filename);
  }, [notesData]);

  // Landing state - not yet generated
  if (!notesData && !isGenerating) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16 gap-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Generate Chapter Notes</h1>
                <p className="text-muted-foreground max-w-md">
                  AI-powered detailed NCERT notes for <strong>{chapter}</strong> ({subject})
                  — complete with formulas, examples, and revision tips.
                </p>
              </div>
              <Button onClick={handleGenerate} size="lg" className="gap-2">
                <FileText className="h-5 w-5" /> Generate Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Generating state
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Generating detailed notes...</p>
            <p className="text-sm text-muted-foreground">This may take 30–60 seconds for comprehensive content</p>
          </div>
        </div>
      </div>
    );
  }

  // Notes generated
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <Button variant="ghost" onClick={() => { resetNotes(); navigate(-1); }} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} variant="outline" size="sm" className="gap-2">
              <Loader2 className="h-4 w-4" /> Regenerate
            </Button>
            <Button onClick={handleDownloadPDF} size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div
              ref={notesRef}
              className="p-8 md:p-12 bg-white text-gray-900 prose prose-sm md:prose-base max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-8
                prose-h3:text-lg prose-h3:mt-6
                prose-blockquote:bg-blue-50 prose-blockquote:border-blue-400 prose-blockquote:rounded-lg prose-blockquote:p-4
                prose-code:bg-gray-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
                prose-strong:text-gray-900
                prose-li:marker:text-primary"
            >
              <div className="text-center mb-8 pb-6 border-b-2 border-primary">
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">{notesData?.chapter}</h1>
                <p className="text-muted-foreground text-sm">{notesData?.subject} · NCERT Detailed Notes</p>
              </div>
              <ReactMarkdown>{notesData?.notes || ""}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { AIEditorTools } from "@/components/editor/ai-editor-tools";
import { EditorCreditsDisplay } from "@/components/editor/editor-credits-display";
import { UtilityTools } from "@/components/editor/utility-tools";
import React from "react";

export const dynamic = 'force-dynamic';

const EditorPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 flex-col md:flex-row gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Photo Editor</h1>
            <p className="text-gray-600">
              Edit your photos to perfection using our advanced AI.
            </p>
          </div>
          <EditorCreditsDisplay />
        </div>

        <AIEditorTools />

        {/* Utility Tools */}
        <UtilityTools />
      </div>
    </div>
  );
};

export default EditorPage;

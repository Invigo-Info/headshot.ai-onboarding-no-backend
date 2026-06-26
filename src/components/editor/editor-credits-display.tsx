import { getEditorCredits } from "@/actions/editor-actions";
import { DAILY_EDITOR_CREDITS_FOR_FREE_USERS } from "@/lib/constants";

export async function EditorCreditsDisplay() {
  const credits = await getEditorCredits();

  const balance = credits
    ? (credits.paid_editor_credit_balance + (DAILY_EDITOR_CREDITS_FOR_FREE_USERS - credits.free_editor_credit_used_count)) || 0
    : 0;

  return (
    <div className="flex items-center gap-2 px-3 py-2 border rounded-md ">
      <div className="flex gap-2 items-center justify-center">
        <span className="text-sm text-gray-700">Editor Credits:</span>
        <span className="text-sm font-semibold text-blue-500">{balance.toLocaleString()}</span>
      </div>
    </div>
  );
}

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep public marketing content in `src/lib/site-content.ts` and reuse shared shells/sections; this prevents drift across the multi-page site.
- Public request forms remain client-side presentation until Lovable Cloud is enabled; do not imply submissions are persisted or emailed.

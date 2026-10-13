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

- Use the uploaded salon page as the baseline and isolate presentation updates to the requested section so unrelated sections remain unchanged.
- Keep service IDs, images and categories in the shared salon catalog so filtering and booking always agree.
- Keep the services presentation in a dedicated component with section-scoped design rules so catalog redesigns cannot change surrounding sections.
- Store salon photos as local files in src/assets and import them directly, so the preview builds without external image links.

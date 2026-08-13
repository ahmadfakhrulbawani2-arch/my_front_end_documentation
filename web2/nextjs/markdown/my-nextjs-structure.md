# My Next JS Project Structure

Good structure enhance more on developer experience and overall project scalabilty. Me personally following the conventional naming that most developer do. The reason is to keep the same standard understanding of what standard NextJS project structure.

## My Project Structure

To visualize the tree, you need to use `tree` in bash or use my tree structure visualized using powershell vai git [here](https://gist.github.com/ahmadfakhrulbawani2-arch/8fdffc34acdf550e7d91e12a06458b1b). I'm not directly provide it to the project template as you guys know not all use windows. Enough talking here's the brief explanation:

```bash
src/
|   |--- app/
|   |   |--- admin/
|   |   |--- cms/
|   |   |   |--- _components/
|   |   |   |--- dasboard/
|   |   |   |--- register/
|   |   |--- favicon.ico
|   |   |--- globals.css
|   |   |--- layout.tsx
|   |   |--- not-found.tsx
|   |   |--- page.tsx
|   |--- assets/
|   |--- components/
|   |   |--- common/
|   |   |--- layouts/
|   |   |   |--- footer/
|   |   |   |--- navbar/
|   |   |--- pages/
|   |   |   |--- homepage/
|   |   |   |--- other-page/
|   |   |--- ui/
|   |--- constants/
|   |--- integrations/
|   |--- libs/
|   |--- providers/
|   |   |--- contexts/
|   |--- services/
|   |--- stores/
|   |--- styles/
|   |--- utils/
```

> [!NOTE]
> What I mean by `page` is the component that has full screen size and always rendered once in route/endpoint. <br />
> I highly recommend you to make all `page.tsx` as server component. If you had to make it client, create new file and render inside that `page.tsx` server. This is ensuring SSR boundary and optimization.

1. `app/` is for app router, providing endpoint in `/` that is `layout.tsx` (server) then it render `page.tsx` (can be client/server). Every folder created here is your new page endpoint routes, unless you put `_` prefix NextJS will ignore it (colocation). I highly not recommend colocation except you need to conditionally render different page.
2. `assets/` is for asset you use as styles and ui. for example a `.ttf` or `.otf` font files. This is different from `public/` where you store visual image or 3d object.
3. `components/` is for storing components to build even bigger components. It contains this:

```bash
--- components/
   |--- common/ # storing frequently used small ui and or high flexibilty to stylize. E.g. SectionHeader.tsx to render every section header text in a page.
   |--- layouts/ # storing components that is used by `page` components. E.g. MainLayout.tsx can receive children to stylize `page` so that can render navbar or footer
   |   |--- footer/ # storing footer components
   |   |--- navbar/ # storing navbar (topbar, sidebar, etc.) components
   |--- pages/ # storing components of each `page` components
   |   |--- homepage/
   |   |--- other-page/
   |--- ui/ # storing ui lib like shadcn-ui, radix-ui or customized ui that is not flexible to stylize (i.e. has its option to stylize).
```

4. `constants/` store your public app config variable to make sure no hardcoded value written to reduce bug by typo. This is differ from `.env` where you config variable to integrate/communicate your app with external app or with your local machine app.
5. `integrations/` store your functional config to integrate or communicate with external app. For example I usually create `api/` then inside it add Create.ts, Read.ts, Update.ts, Delete.ts to store namespace for each tanstack + axios api.
6. `libs/` store my customize library. It can be context, provider or object to gain spesific feature. I usually write my Axios.ts and TanstackQueryProvider.tsx for my API need.
7. `providers/` and `provider/contexts/` is to manage app state. I usually do my theme provider here.
8. `services/` store the business logic to manage data. I don't use it much as my Back-end already handle this feature.
9. `stores/` store the configuration for accessing localstorage or cookies. I usually create LocalJwt.ts to check my jwt or CookieTheme.ts to check my theme cookie.
10. `styles/` store all `.css` outside `globals.css` for modularity of css file.
11. `utils/` store all ui logic or small development logic that is frequently used to reduce line of code.

From here, some people actually make `feature/` to store some of the folder above. But in my opinion, exposing all folder is as declarative way as possible for project structure clarity. That's it, now you can play around to check this topic [here](../playground/my-nextjs-structure/)

## Any Question?

If you have any question feel free opening new issue. Thanks!

---

Author: Ahmad Fakhrul Bawani

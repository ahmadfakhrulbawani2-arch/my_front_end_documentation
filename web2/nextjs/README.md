# NextJS Documentation

Here you can learn how I built project using NextJS and the problem in it.

## Prerequisites

1. Install IDE, I still use VSCode and sometime Zed.
2. Install NodeJS
3. Install pnpm (optional, I highly recommend it for efficiency and full node compatibility over yarn and bun)

Very simple. Already a lot tutorial on youtube to install it.

## Making of NextJS

You can use my [playground](./playground/) boilerplate if you want, just install all dependencies by using `npm install` or `pnpm install`. <br />
If not, make sure to create it yourself:

```bash
pnpm create next-app@latest blank-nextjs
```

Then choose this settings:

```bash
# 1. Use custom setting
? Would you like to use the recommended Next.js defaults? » - Use arrow-keys. Return to submit.
    Yes, use recommended defaults
    No, reuse previous settings
>   No, customize settings - Choose your own preferences

# 2. My recommended settings (No AI please)
√ Would you like to use TypeScript? ... No / Yes # choose yes
√ Which linter would you like to use? » Biome
√ Would you like to use React Compiler? ... No / Yes # choose yes
√ Would you like to use Tailwind CSS? ... No / Yes # choose yes
√ Would you like your code inside a `src/` directory? ... No / Yes # choose yes
√ Would you like to use App Router? (recommended) ... No / Yes # choose yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes # choose no
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... No / Yes # choose no
```

> [!NOTE]
> Notice that NextJS always initialize git. You can delete it by show the hidden file in file explorer or by using bash `rm -rf .git` <br/>
> You can initialize it by following [this](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## What's next?

Alright so you're set now, next step is every knowledge I documented. Stay tune.

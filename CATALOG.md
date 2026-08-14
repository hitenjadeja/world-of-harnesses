# Harness catalog

Verified snapshot: **2026-08-14** · **196 entries** · **12 categories**

> Scope: agent harnesses plus adjacent runtimes, coding agents, orchestration, memory, tool, sandbox, observability, and evaluation infrastructure. “Verified” means the record passed schema/duplicate checks and its discovery source or primary source was live on the snapshot date; it is not a security endorsement.

## Progressive disclosure harnesses (8)

Formats, runtimes, and patterns that reveal context, tools, or instructions in layers—index first, details on demand—to control tokens and improve agent focus (the "map, not encyclopedia" principle).

| Project | Availability | Description |
| --- | --- | --- |
| [Headroom](https://github.com/headroomlabs-ai/headroom) | Open source | Compresses tool outputs, logs, files, and RAG chunks with content-aware compressors before they reach the model—claimed 20% fewer tokens for coding agents and 60–95% fewer for JSON, same answers. Ships as a library, HTTP proxy, or MCP server, so it drops in front of whatever harness you already run. |
| [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | Open source | Curated .cursorrules and skills that leverage Cursor's index-then-load model; the canonical collection for rules-as-progressive-disclosure in the IDE. |
| [agents.md](https://github.com/agentsmd/agents.md) | Open source | Open format for repo-scoped agent briefings; nested AGENTS.md files scope instructions per directory, so agents get a map of what exists and load only what's relevant. Read by 20+ tools including Codex, Cursor, and Copilot. |
| [context-mode](https://github.com/mksglu/context-mode) | Unclear | Context-window optimization layer that sandboxes tool output before it reaches the model (claimed 98% reduction) and persists session memory across 17 agent platforms via MCP and hooks—progressive disclosure applied to tool results, not just instructions. |
| [langgraph-bigtool](https://github.com/langchain-ai/langgraph-bigtool) | Open source | Build LangGraph agents with large tool sets; retrieval and on-demand tool loading so agents scale beyond context without stuffing every schema upfront. |
| [MCP-Zero](https://github.com/xfey/MCP-Zero) | Open source | Active tool discovery for autonomous agents: model requests tools by requirement; hierarchical semantic routing over 308 servers / 2,797 tools with ~98% token reduction (APIBank). |
| [ToolGen](https://github.com/Reason-Wang/ToolGen) | Unclear | ICLR 2025: unified tool retrieval and calling via generation; 47k+ tools without context stuffing—retrieval and invocation in one generative step. |
| [ToolRAG](https://github.com/antl3x/ToolRAG) | Open source | Semantic tool retrieval for LLMs; serves only the tools the user query demands (MCP-compatible), unlimited tool sets with zero context penalty. |

## Coding agent products (IDEs, CLIs, full suites) (38)

Turnkey coding agents you install and run: IDE extensions, terminal CLIs, Dockerized workspaces. Each entry notes which part is the harness (the agent loop, tool wiring, approval model) versus the UI shell (VS Code extension, TUI, browser client).

| Project | Availability | Description |
| --- | --- | --- |
| [opencode](https://github.com/anomalyco/opencode) | Open source | Open-source terminal coding agent (formerly `sst/opencode`; transferred to anomalyco). The **harness** is a multi-provider tool-call loop (Claude, OpenAI, Gemini, local) with strong plugin and MCP support; the TUI is the shell. 100% OSS, very actively shipped. |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Open source | Google's first-party terminal agent for Gemini. The **harness** is the plugin/MCP tool-call loop; the terminal is the shell—Google's parallel to Claude Code / Codex, not just an API. |
| [Codex](https://github.com/openai/codex) | Open source | OpenAI's terminal coding agent. The **harness** is the sandboxed tool-call loop with multi-provider support; the CLI is the shell. Reference implementation for "official CLI that ships code." |
| [pi](https://github.com/earendil-works/pi) | Unclear | The upstream AI agent toolkit behind this list's oh-my-pi fork: a unified multi-provider LLM API, agent loop, and TUI shell providing the **harness** that oh-my-pi's Rust rewrite builds on. |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | Open source | DeepSeek's official, plugin-first agent harness with composable runtimes for coding, code-mode execution, minimal benchmark loops, and harness creation. |
| [OpenHands](https://github.com/OpenHands/OpenHands) | Unclear | Dockerized software-engineering agent. The **harness** is the bash/editor/browser toolset with micro-agents and event-stream session bridging; Docker is the sandbox. Main OSS choice for teams self-hosting autonomous repo work. |
| [Open Interpreter](https://github.com/openinterpreter/openinterpreter) | Open source | Lightweight terminal coding agent oriented to open models (DeepSeek, Kimi, Qwen). The **harness** is a code-execution loop — the model writes code, the harness executes it with confirmation gates; the CLI is the shell. The original "let the LLM run code on my machine" project, reborn for open weights. |
| [Cline](https://github.com/cline/cline) | Open source | VS Code extension whose **harness** is a plan-then-act loop with per-step human approval and cost transparency; the VS Code integration is the UI shell. Open-source counterweight to Cursor. |
| [goose](https://github.com/aaif-goose/goose) | Open source | Block-originated Rust agent, now stewarded by the Linux Foundation's Agentic AI Foundation (`aaif-goose/goose`). The **harness** is the MCP/ACP extension model with recipes and provider choice; there's no fixed UI slot—you bolt it into whatever shell you use. |
| [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | Unclear | DeepSeek-native terminal coding agent. The **harness** is engineered around prefix-cache stability for long-running sessions; the TUI is the shell. |
| [vibe-kanban](https://github.com/BloopAI/vibe-kanban) | Unclear | Kanban-style fleet manager for running Claude Code, Codex, or any coding agent across many tasks at once. The **harness** contribution is the task-queue/review layer on top of whichever agent executes; not an agent loop itself. |
| [crush](https://github.com/charmbracelet/crush) | Unclear | Charm's terminal coding agent (Charm's fork of the original OpenCode). The **harness** is the tool-calling loop with session persistence; the Bubble Tea TUI is the shell. |
| [qwen-code](https://github.com/QwenLM/qwen-code) | Unclear | Alibaba's official terminal coding agent, forked from Gemini CLI's agent loop and retuned for Qwen models. The **harness** is the same sandboxed tool-call loop as its upstream; the terminal is the shell. |
| [Kilo Code](https://github.com/Kilo-Org/kilocode) | Unclear | VS Code extension and CLI in the Cline/Roo-Code lineage — a natural pick now that Roo-Code is archived upstream. The **harness** is an approval-gated autonomous-mode loop with a provider/tool marketplace; the IDE is the shell. |
| [Symphony](https://github.com/openai/symphony) | Unclear | OpenAI's harness for fanning a task out into many isolated, autonomous coding-agent implementation runs and surfacing the ones that pass, so a team manages outcomes instead of supervising each session. |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code) | Open source | VS Code/Cursor extension in the Cline lineage. The **harness** is the approval-gated agent with custom modes and a strong MCP story; the IDE is the UI. Popular community fork when you want that workflow without the upstream extension. |
| [oh-my-pi](https://github.com/can1357/oh-my-pi) | Open source | Terminal coding agent (fork of Pi) that wires the IDE into the **harness**: hash-anchored edits, a 32-tool loop tuned per-model, LSP rename/references/diagnostics on every write, a real DAP debugger (lldb/dlv/debugpy), long-lived Python + Bun execution kernels that call back into the agent's tools, browser control, and 40+ providers (Claude/OpenAI/Gemini/local). ~55k-line Rust core. |
| [jcode](https://github.com/1jehuang/jcode) | Unclear | Rust terminal coding agent pitched as the most RAM-efficient **harness** in its class; MCP support, multi-provider (Claude/OpenAI). |
| [eigent](https://github.com/eigent-ai/eigent) | Unclear | Open-source desktop **harness** positioned as a local, free alternative to Claude Cowork and Codex: multi-agent workspace orchestration in a self-hosted app rather than a hosted product. |
| [cc-haha](https://github.com/NanmiCoder/cc-haha) | Unclear | Local-first desktop workspace **harness** for Claude Code and other agents: multi-agent sessions, Git worktrees, code diffs, a skill marketplace, and chat-app access (WeChat, Telegram, WhatsApp). |
| [Kimi CLI](https://github.com/MoonshotAI/kimi-cli) | Open source | Moonshot AI's open-source terminal coding agent, with an agent loop, shell and file tools, skills, MCP support, and Kimi model integration. |
| [claw-code-agent](https://github.com/HarnessLab/claw-code-agent) | Unclear | Python reimplementation of the Claude Code agent architecture with zero external dependencies; interactive chat, streaming, plugin runtime, nested agent delegation, cost tracking, MCP transport—portable harness without the Rust/TS toolchain. |
| [AgentBox](https://github.com/madarco/agentbox) | Open source | Runs multiple coding agents in parallel, each in its own sandboxed VM, locally or in the cloud, from one command. The **harness** contribution is the VM-per-agent isolation and fleet fan-out layer; whichever agent runs inside owns the loop. |
| [Proliferate](https://github.com/proliferate-ai/proliferate) | Open source | Open-source AI IDE for Claude Code, Codex, OpenCode, and more. The **harness** contribution is the workspace/session orchestration layer: run multiple coding agents in parallel, locally or in the cloud, with isolated workspaces, reusable workflows, and shared team context. |
| [agent-harness (Go)](https://github.com/BA-CalderonMorales/agent-harness) | Unclear | A clean-room Go coding harness with streaming, permissioned tools, interactive and autonomous modes, encrypted credentials, sessions, and layered configuration. |
| [Amp](https://ampcode.com/manual) | Proprietary | Sourcegraph's agentic coding harness, available through a CLI and editor integrations, with repository context, tools, threads, and team sharing. |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) | Proprietary | Anthropic's coding-agent harness for terminal, IDE, desktop, and cloud workflows, with tools, subagents, hooks, skills, MCP, and permission controls. |
| [Cursor Agent](https://cursor.com/docs/agent/overview) | Proprietary | Cursor's IDE-native coding harness for autonomous code exploration, editing, command execution, planning, review, and background agents. |
| [Devin](https://docs.devin.ai/) | Proprietary | Cognition's hosted software-engineering agent harness with a sandboxed development environment, browser, shell, editor, planning, and collaboration surfaces. |
| [Factory Droid](https://docs.factory.ai/cli/getting-started/overview) | Proprietary | Factory's software-development agent harness for interactive and autonomous work across a CLI, IDE, web, and managed enterprise environments. |
| [GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) | Proprietary | GitHub's background coding harness that works from issues and prompts in an ephemeral environment, validates changes, and opens pull requests for review. |
| [Honk](https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint) | Internal | Spotify's internal background coding harness: Claude Agent SDK sessions run in Kubernetes, use trusted tools and CI, and feed Fleetshift-managed migrations and pull requests. |
| [Jules](https://jules.google/docs/) | Proprietary | Google's asynchronous coding-agent harness that clones repositories into cloud VMs, plans and executes changes, and returns branches or pull requests. |
| [Junie](https://www.jetbrains.com/junie/) | Proprietary | JetBrains' coding-agent harness integrated into JetBrains IDEs and GitHub for delegated implementation, testing, and code review. |
| [Kiro](https://kiro.dev/docs/cli/) | Proprietary | AWS's spec-driven coding-agent harness with CLI and IDE surfaces, steering files, hooks, skills, MCP servers, and autonomous execution controls. |
| [Replit Agent](https://docs.replit.com/replitai/agent) | Proprietary | Replit's hosted software-building harness that plans, writes, tests, and deploys applications inside the Replit workspace. |
| [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade) | Proprietary | Windsurf's IDE-native agent harness with codebase context, planning, tool calls, terminal access, checkpoints, memories, rules, and MCP integrations. |
| [Xirp](https://xirp.spotify.com) | Proprietary | Spotify's beta coding-agent harness with institutional memory: it grounds Claude, Gemini, or Codex in service ownership, dependencies, documentation, and architectural decisions, while preserving context across local and remote sessions. |

## Coding harness configs and SDKs (23)

Skill packs, slash-command libraries, meta-prompting frameworks, and official SDKs that give you the harness (the agent loop, planning, memory, hooks) without bundling a specific IDE or CLI shell.

| Project | Availability | Description |
| --- | --- | --- |
| [superpowers](https://github.com/obra/superpowers) | Open source | Performance-oriented harness pack for Claude Code and 13 other harnesses (Codex, Cursor, OpenCode, Gemini CLI, more): skills, instincts, memory, security, research-first workflows. Treats harness engineering itself as the performance lever. |
| [Anthropic Skills](https://github.com/anthropics/skills) | Unclear | Anthropic's official Agent Skills repository: SKILL.md-based folders (instructions, scripts, resources) Claude dynamically loads on Claude Code, Claude.ai, and the API. The reference for progressive-disclosure skill packs in 2026. |
| [GStack](https://github.com/garrytan/gstack) | Open source | Garry Tan's Claude Code skill stack: 23 slash-command modes (CEO/eng/design review, QA, ship, browse, retro, …) that structure one assistant as a virtual engineering team. Daily driver while running YC. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Open source | Addy Osmani's production-grade skill pack: 24 engineering skills and 4 specialist agent personas that encode senior-dev workflows (spec through deploy) across 70+ coding agents including Claude Code, Cursor, and Copilot. The **harness** contribution is the skill/workflow layer, not a new agent loop. |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Unclear | Large community-curated index of Claude Code skills, slash commands, status lines, and plugins—resources for extending the harness, not a harness itself, but the most-followed catalog of the genre. |
| [wshobson/agents](https://github.com/wshobson/agents) | Open source | Cross-harness marketplace of drop-in subagents and skills for Claude Code, Codex CLI, Cursor, OpenCode, and Copilot; specialized, production-ready agent definitions you install rather than hand-write. |
| [planning-with-files](https://github.com/OthmanAdi/planning-with-files) | Unclear | Skill for persistent, file-based planning across long-running coding-agent sessions: crash-proof markdown plans, session recovery after `/clear`/compaction, and a deterministic completion gate—Manus-style planning as a drop-in **harness** layer via the Agent Skills standard. |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent) | Open source | LM-driven harness built for SWE-bench: edit state, command execution, and issue-focused loop—the reference agent stack next to the benchmark itself. |
| [get-shit-done](https://github.com/open-gsd/gsd-core) | Open source | Goal-backward planning and wave-based execution over fresh context windows; avoids context rot by design. Python/JS meta-prompting for Claude Code, OpenCode, Gemini CLI. |
| [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python) | Open source | Official Anthropic SDK (Python + [TypeScript](https://github.com/anthropics/claude-agent-sdk-typescript), [demos](https://github.com/anthropics/claude-agent-sdk-demos), [quickstarts](https://github.com/anthropics/claude-quickstarts)): built-in tools, MCP, long-running coding agents with session bridging. |
| [agents-cli](https://github.com/google/agents-cli) | Unclear | Google's official CLI and skill pack that layers agent-creation, evaluation, and deployment skills on top of whatever coding assistant you already run, rather than shipping its own agent loop—the **harness** as a config/skills add-on, not a new runtime. |
| [skillhub](https://github.com/iflytek/skillhub) | Unclear | iFlytek's self-hosted registry for publishing, versioning, and governing agent skill packages—the **harness** config layer treated as an enterprise artifact store rather than a CLI or IDE shell. |
| [Meta-Harness](https://github.com/stanford-iris-lab/meta-harness) | Unclear | Reference implementation from the Meta-Harness paper: an academic testbed for harness-engineering research, not a product—useful as a citation-grade baseline rather than something you'd run in production. |
| [MoAI-ADK](https://github.com/modu-ai/moai-adk) | Open source | A spec-driven Claude Code development harness with plan/run/sync workflows, quality gates, model routing, and multi-model delegation. |
| [RepoMaster](https://github.com/QuantaAlpha/RepoMaster) | Unclear | Repo-scoped research harness: builds function-call and module-dependency graphs to explore only what's needed; large relative gains on MLE-bench and GitTaskBench with lower token use. |
| [HarnessX](https://github.com/Darwin-Agent/HarnessX) | Open source | A harness foundry for composing reusable processors and bundles into model-independent agent harnesses and evolving them through training. |
| [AutoHarness](https://github.com/aiming-lab/AutoHarness) | Open source | Lightweight governance harness: wraps any LLM client in ~2 lines for automated harness engineering—6–14 step pipeline, YAML constitution, risk-pattern matching, session persistence with cost tracking, multi-agent profiles. |
| [LoopTroop](https://github.com/looptroop-ai/LoopTroop) | Open source | Config layer that chains LLM councils for planning, Ralph loops for iterative refinement, and OpenCode worktrees for shipping. The **harness** contribution is the council → loop → worktree pipeline; OpenCode underneath executes. |
| [Harness Kit](https://github.com/deepklarity/harness-kit) | Open source | A coding-agent engineering toolkit combining dependency-aware multi-agent orchestration, an evidence-carrying task board, and reusable quality patterns. |
| [FSPEC](https://github.com/sengac/fspec) | Open source | A spec-driven multi-agent software delivery harness that turns human-authored intent into autonomous, evidence-gated implementation work. |
| [Agent Harness by Wild](https://github.com/madebywild/agent-harness) | Open source | A TypeScript configuration compiler that manages prompts, skills, MCP servers, and subagents once, then emits native Codex, Claude, Copilot, and Cursor files. |
| [pmstack](https://github.com/RyanAlberts/pmstack) | Open source | Claude Code config for AI product managers: CLAUDE.md plus skills for competitive analysis, PRD-from-signal, metric frameworks, stakeholder briefs, and agent eval design. "GStack for PMs." |
| [Autonomous Coding Harness](https://github.com/GantisStorm/autonomous-coding-harness) | Unclear | A human-in-the-loop Claude Agent SDK harness that connects fresh sessions through durable artifacts and GitLab milestone workflows. |

## Personal agent runtimes (10)

Always-on, self-hosted agents you run as a daemon and talk to from chat apps: gateway runtimes, second brains, and self-improving assistants. The agent as a product you operate, not a library you build with.

| Project | Availability | Description |
| --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Open source | Self-hosted, always-on personal agent (formerly Clawdbot/Moltbot): a gateway + event-loop runtime that treats messages, heartbeats, crons, and webhooks as one input queue, persists state to local files, and lives in your chat apps (WhatsApp, Telegram, Slack, Discord). 13,700+ community skills; the fastest-growing repo in GitHub history. |
| [Hermes](https://github.com/NousResearch/hermes-agent) | Open source | Nous Research's self-improving agent: a learning loop turns experience into reusable skills, builds a persistent user model across sessions, and checkpoints state to disk with rollback; lean enough for a $5 VPS, driven from chat, and model-agnostic (Nous Portal, OpenRouter, OpenAI, or any endpoint). |
| [nanobot](https://github.com/HKUDS/nanobot) | Unclear | Ultra-lightweight, self-hosted personal agent framework: the **harness** is a Python daemon wiring tools, memory, and MCP into chat/webhook front ends (Telegram, Discord, web); minimal footprint alternative to heavier personal-runtime stacks. |
| [CowAgent](https://github.com/zhayujie/CowAgent) | Unclear | Self-hosted **harness** (formerly chatgpt-on-wechat) that plans tasks, runs tools/skills, and self-evolves via memory; multi-model, multi-channel (WeChat, Telegram, etc.), one-line install. |
| [Khoj](https://github.com/khoj-ai/khoj) | Open source | Self-hostable "AI second brain": answers over your docs and the web, custom agents, scheduled automations, and multi-client reach (web, Obsidian, Emacs, WhatsApp). A personal-agent harness with retrieval at the core. |
| [Eliza](https://github.com/elizaOS/eliza) | Open source | Open "agentic operating system" (elizaOS): persistent multi-agent runtime with character files, a plugin ecosystem, and social/platform integrations — the harness behind a large share of autonomous social agents. |
| [Agent Zero](https://github.com/agent0ai/agent-zero) | Unclear | Organic, prompt-defined personal agent framework: hierarchical sub-agents, persistent memory, browser and code tools, and self-modifying behavior; runs in Docker with a web UI. |
| [OpenHarness (HKUDS)](https://github.com/HKUDS/OpenHarness) | Open source | Open agent harness with a built-in personal agent ("Ohmo") that runs across Feishu, Slack, Telegram, and Discord; core tool-use, skills, memory, multi-agent coordination with auto-compaction for multi-day sessions. |
| [AIlice](https://github.com/myshell-ai/AIlice) | Open source | Fully autonomous general-purpose agent; one binary, Docker-ready, for when you want "set goal and walk away" without a framework. |
| [Talon](https://github.com/dylanneve1/talon) | Open source | Multi-platform personal agent living in Telegram, Discord, Teams, and the terminal. The **harness** is a pluggable-backend loop (Claude, Kilo, OpenCode, Codex, OpenAI Agents) with full MCP tool access and persistent background agents (Goals, Heartbeat, Dream); the chat apps are shells. |

## Frameworks (26)

General-purpose agent and LLM application frameworks (the app layer, not harnesses per se).

| Project | Availability | Description |
| --- | --- | --- |
| [n8n](https://github.com/n8n-io/n8n) | Unclear | Fair-code workflow engine with 400+ nodes and native AI nodes; the self-hosted Zapier that actually does agents and LangChain. |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Unclear | The original autonomous loop: goal in, agent iterates with tools and memory; Forge is the dev framework, Benchmark the eval harness. |
| [langflow](https://github.com/langflow-ai/langflow) | Open source | Low-code UI to build and deploy LangChain/LangGraph flows; visual DAG editor and one-click run. |
| [Dify](https://github.com/langgenius/dify) | Unclear | One-stop LLM app platform: visual workflows, RAG pipeline, 50+ tools, model management; "ship from prototype to prod" in a single UI. |
| [langchain](https://github.com/langchain-ai/langchain) | Open source | Chains, tools, retrievers, and agents; the usual entry point for "add tools to an LLM" in Python/JS. |
| [browser-use](https://github.com/browser-use/browser-use) | Open source | Python web-agent **harness**: natural-language goals become browser actions, driven directly over the Chrome DevTools Protocol (it dropped Playwright in August 2025). The biggest community in the browser-agent category. |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Unclear | Drag-and-drop LangChain UI; deploy flows without code. The low-code sibling to Langflow, with a different component and hosting story. |
| [llama-index](https://github.com/run-llama/llama_index) | Open source | Data-centric: indexing, RAG, and query engines; agent abstractions sit on top of your data pipelines. |
| [agno](https://github.com/agno-agi/agno) | Open source | Python agents with memory, knowledge bases, tools, and structured outputs; continues the PhiData-era product line under the Agno name—production apps, evals, and pipelines. |
| [langgraph](https://github.com/langchain-ai/langgraph) | Open source | State-machine graphs over LLM steps; checkpointing, human-in-the-loop, and durable execution so workflows survive restarts. |
| [semantic-kernel](https://github.com/microsoft/semantic-kernel) | Open source | Microsoft's plugin and planner layer for LLMs; C#, Python, Java; strong on enterprise auth and orchestration. |
| [mastra](https://github.com/mastra-ai/mastra) | Unclear | TypeScript-first; agents, tools, and workflows with a single runtime and minimal boilerplate. |
| [Haystack](https://github.com/deepset-ai/haystack) | Open source | Open-source orchestration framework for context-engineered LLM apps: modular pipelines and agent workflows with explicit control over retrieval, routing, memory, and generation—closer to LangChain's territory than a coding-agent harness. |
| [letta](https://github.com/letta-ai/letta) | Open source | Python agent runtime with tool use and control flow; lean API; stateful agents with long-horizon memory. |
| [Stagehand](https://github.com/browserbase/stagehand) | Open source | Browserbase's SDK for browser agents: natural-language actions (act, extract, observe) and deterministic Playwright code mix in one script, so agent flexibility and repeatable automation live in the same **harness**. |
| [rasa](https://github.com/RasaHQ/rasa) | Open source | Conversational AI stack (NLU, dialogue, actions); long-standing OSS choice for chat and voice bots. |
| [Google ADK](https://github.com/google/adk-python) | Open source | Google's official Agent Development Kit: code-first Python toolkit for building, evaluating, and deploying agents. Optimized for Gemini but model-agnostic; deploys to Cloud Run / Vertex AI; ships a dev UI with eval and a code-execution sandbox. |
| [botpress](https://github.com/botpress/botpress) | Open source | Visual bot builder and runtime; multi-channel, open-source alternative to commercial bot platforms. |
| [R2R](https://github.com/SciPhi-AI/R2R) | Open source | RAG-first: hybrid search, knowledge graphs, multimodal; the framework for "production RAG" when you care more about retrieval than chat UI. |
| [agent-squad](https://github.com/2FastLabs/agent-squad) | Open source | AWS-originated orchestrator (now under 2FastLabs): intent classification, streaming, SupervisorAgent; "agent-as-tools" so one agent delegates to a squad. |
| [AgentVerse](https://github.com/OpenBMB/AgentVerse) | Open source | Task-solving and simulation envs for multi-LLM agents; deploy many agents in custom environments without building infra from scratch. |
| [youtu-agent](https://github.com/TencentCloudADP/youtu-agent) | Unclear | Tencent Cloud's agent framework: a minimal tool-calling **harness** designed to perform well with open-source models, positioned as a lighter alternative to heavier orchestration frameworks. |
| [Bee Agent Framework](https://github.com/i-am-bee/beeai-framework) | Open source | Python + TypeScript, LF AI–backed; MCP/ACP, workflows, Requirement Agent; the one that pushes "production multi-agent" without LangChain. |
| [AgentStack](https://github.com/agentstack-ai/AgentStack) | Open source | Scaffolds full agent projects; plugs in CrewAI, LangGraph, OpenAI Swarm, LlamaStack and wires AgentOps observability from day one. |
| [AgentSilex](https://github.com/howl-anderson/agentsilex) | Open source | ~300 lines of readable agent code on top of LiteLLM; the "I want to see the whole loop" option for learning or minimal production. |
| [SuperAgentX](https://github.com/superagentxai/superagentx) | Open source | Lightweight multi-agent orchestrator with an AGI-angle; minimal surface, docs-first, for teams that want orchestration without the kitchen sink. |

## Multi-agent and orchestration (15)

Harnesses and patterns for multi-agent coordination and handoffs.

| Project | Availability | Description |
| --- | --- | --- |
| [MetaGPT](https://github.com/FoundationAgents/MetaGPT) | Open source | The "AI software company" multi-agent framework: role-played PM, architect, and engineer agents turn a one-line requirement into specs, designs, and code along an SOP assembly line. The landmark of the genre; development pace has slowed in 2026. |
| [autogen](https://github.com/microsoft/autogen) | Open source | Conversable agents and group chats; code execution and human-in-the-loop; Microsoft origin, AG2 ecosystem. ⚠️ In maintenance mode since late 2025: no new features, and Microsoft directs new users to Agent Framework. |
| [OpenManus](https://github.com/FoundationAgents/OpenManus) | Open source | Open, invite-free general agent from the MetaGPT team: planning plus tool use over a multi-agent loop, aimed at reproducing Manus-style autonomous task completion on your own keys. |
| [crewAI](https://github.com/crewAIInc/crewAI) | Open source | Role-based agents (roles, goals, backstories) in Crews; Flows add event-driven and hierarchical control for production. |
| [ChatDev](https://github.com/OpenBMB/ChatDev) | Open source | Multi-agent software-company simulation (CEO, CTO, programmer, tester) built on chat chains with communicative dehallucination; ChatDev 2.0 continues the line. MetaGPT's conversational sibling. |
| [openai-agents-python](https://github.com/openai/openai-agents-python) | Open source | Handoffs, guardrails, and multi-LLM routing; minimal surface so you own the loop. |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | Open source | Microsoft's convergence of AutoGen and Semantic Kernel: build, orchestrate, and deploy agents and multi-agent workflows in Python and .NET, with graph-based workflows and checkpointing — the designated successor harness for both lines. |
| [hive](https://github.com/aden-hive/hive) | Unclear | Self-hosted multi-agent **harness** aimed at production workloads: human-in-the-loop checkpoints and a self-improving agent loop, distinct from single-session coding-agent shells. |
| [PraisonAI](https://github.com/MervinPraison/PraisonAI) | Open source | Autonomous multi-agent teams with a single entry point; emphasis on minimal config. |
| [omnigent](https://github.com/omnigent-ai/omnigent) | Unclear | Open-source meta-**harness**: orchestrates Claude Code, Codex, Cursor, Pi, and custom agents behind one policy/sandboxing layer so teams swap harnesses without rewriting workflows. |
| [AG2](https://github.com/ag2ai/ag2) | Unclear | AG2 (formerly AutoGen): the community-governed continuation of the original AutoGen project after Microsoft's fork diverged—conversable multi-agent groups, code execution, and human-in-the-loop under an open-source AgentOS banner. Graduated off the radar this cycle. |
| [AgentRL](https://github.com/THUDM/AgentRL) | Open source | Multitask, multiturn RL for LLM agents; Ray-based scaling, rollout/actor workers—for teams that want to train agents, not just run them. |
| [AgentHub](https://github.com/Stanshy/AgentHub) | Open source | A desktop multi-agent management harness with specialized roles, skills, hooks, file watchers, quality gates, and traceable workflows. |
| [team-harness](https://github.com/writeitai/team-harness) | Open source | A provider-neutral coordination layer for Claude Code, Codex, Gemini CLI, and other workers, with nested runs, persistent task state, and replayable logs. |
| [Warp Oz](https://www.warp.dev/blog/oz-orchestration-platform-cloud-agents) | Proprietary | Warp's programmable control plane for local and cloud coding agents, with scheduling, parallel runs, hosted or self-hosted environments, audit trails, and API/CLI access. |

## Plugins, MCPs, CLI tools (21)

IDE plugins, concrete MCP servers, and CLI tools that give agents tools and context.

| Project | Availability | Description |
| --- | --- | --- |
| [MCP Servers](https://github.com/modelcontextprotocol/servers) | Open source | The official reference collection of Model Context Protocol servers (filesystem, git, fetch, memory, time, and more)—the canonical, vetted toolset agents connect to, and the pattern every other MCP server is measured against. |
| [Context7](https://github.com/upstash/context7) | Open source | MCP server that injects up-to-date, version-specific library docs into an agent's context on demand; kills the stale-training-data hallucinations that plague codegen. |
| [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Open source | Google's official Chrome DevTools MCP server: exposes console, network, and performance-trace inspection as tool calls agents can drive directly, instead of a human clicking through the DevTools panel. |
| [aider](https://github.com/Aider-AI/aider) | Open source | Git-aware CLI pair programmer; edits in-repo, supports multiple models and MCP so agents see version control and tools. |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Open source | Playwright's official MCP server: structured browser control (navigate, click, fill, extract) via the accessibility tree rather than screenshots, so web tasks stay fast and deterministic. |
| [continue](https://github.com/continuedev/continue) | Open source | Open-source IDE extension (VS Code, JetBrains); in-editor completion and chat with local or API models. |
| [github-mcp-server](https://github.com/github/github-mcp-server) | Open source | GitHub's official MCP server (Go): repos, issues, PRs, code search, Actions. Replaces the older community `cyanheads/github-mcp-server` as the canonical way to give agents GitHub access. |
| [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) | Open source | Official SDK to build and consume MCP servers/clients in Python; stdio and SSE transports. |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | Open source | Official MCP implementation for Node/TS; reference for the protocol. |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector) | Open source | GUI to test and debug MCP servers; inspect tools, resources, and prompts. |
| [MCP Registry](https://github.com/modelcontextprotocol/registry) | Open source | Official, community-driven registry for MCP servers—the "app store" MCP clients use to discover servers. Maintained by Anthropic + ecosystem maintainers; v0.1 API frozen, production-grade. |
| [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) | Open source | Microsoft's policy-enforcement layer for autonomous agents: zero-trust identity, execution sandboxing, and OWASP Agentic Top-10 coverage sit in front of the agent loop as a **harness** security layer—the governance counterpart to Infisical's agent-vault. |
| [mcp-context-forge](https://github.com/IBM/mcp-context-forge) | Unclear | IBM's official AI gateway/registry/proxy that sits in front of any MCP, A2A, or REST/gRPC API: unified endpoint, centralized discovery, guardrails, and plugin support—the enterprise front door for **harness** tool calling. Graduated off the radar this cycle. |
| [cocoindex-code](https://github.com/cocoindex-io/cocoindex-code) | Unclear | Embedded, tree-sitter/AST-based code-search CLI and MCP server that gives coding agents fast semantic lookups over a repo instead of grepping or re-reading whole files into context. |
| [agent-vault](https://github.com/Infisical/agent-vault) | Unclear | Infisical's HTTP credential proxy that fronts secrets for Claude Code, OpenClaw, and other agent harnesses so the agent's tool calls never see raw credentials—a **harness** security layer, not an agent loop itself. |
| [Docker MCP Gateway](https://github.com/docker/mcp-gateway) | Open source | Docker's official MCP CLI plugin / gateway; container-aware MCP tooling from Docker (replaces deprecated `docker/mcp-servers` path). |
| [Swamp](https://github.com/swamp-club/swamp) | Open source | A local CLI for agents to create deterministic, reviewable operational workflows, typed models, auditable runs, and versioned outputs. |
| [puppeteer-real-browser-mcp](https://github.com/withLinda/puppeteer-real-browser-mcp-server) | Unclear | Puppeteer MCP with real-browser and anti-detection; for agents that need to drive sites that block headless. |
| [Better-OpenCodeMCP](https://github.com/ajhcs/Better-OpenCodeMCP) | Open source | MCP server for OpenCode/Crush: async task execution, model bridging (e.g. Claude→Gemini), process pooling. |
| [Harness Hat](https://github.com/only-cliches/harness-hat) | Open source | A local Docker control plane that gives coding agents filtered workspaces and governs commands, networking, subagents, and logs with repository policy. |
| [agentlog](https://github.com/RyanAlberts/agentlog) | Open source | Persistent decision memory for any project: `remember`, `recall`, `reflect`. Single-file Python CLI that stores decisions as JSONL and uses Claude or Gemini to retrieve and synthesize patterns—Karpathy's LLM Wiki concept as a CLI. |

## Memory and state (5)

Persistent memory layers that give agents recall across turns and sessions: knowledge graphs, vector stores, and session-capture tools that survive a restart. The state a harness needs but rarely ships with.

| Project | Availability | Description |
| --- | --- | --- |
| [claude-mem](https://github.com/thedotmack/claude-mem) | Open source | Session-memory plugin for Claude Code, Codex, OpenClaw, Gemini, Copilot, and more: captures everything an agent does during a session, AI-compresses it, and injects the relevant context into future sessions. Session-to-session memory as a drop-in. |
| [Mem0](https://github.com/mem0ai/mem0) | Open source | Universal memory layer for AI agents: stores user/org/session memory, retrieves on demand. Apache-2.0; the de-facto memory primitive paired with most harnesses in 2026. |
| [cognee](https://github.com/topoteretes/cognee) | Open source | Open-source memory layer for agents: an extract–cognify–load pipeline that turns your data into a queryable knowledge graph plus vector store, so agents recall facts and relationships across sessions instead of re-reading context. |
| [Graphiti (Zep)](https://github.com/getzep/graphiti) | Open source | Zep's open-source memory engine: real-time temporal knowledge graphs that track how facts about users and entities change over time, so agents can answer "what was true when." The layer behind Zep's hosted memory platform. |
| [beads](https://github.com/gastownhall/beads) | Unclear | Portable persistent-memory layer for coding agents: tracks decisions and task state outside the harness's own context window so it survives session resets and model swaps. |

## Evaluation and benchmarking harnesses (19)

Agentic eval systems, reasoning benchmarks, and open agent benchmarks.

| Project | Availability | Description |
| --- | --- | --- |
| [Agent Lightning](https://github.com/microsoft/agent-lightning) | Open source | Microsoft's training-oriented harness: optimization loops for agent behavior—when you need to improve policies over rollouts, not only score a fixed prompt. |
| [SWE-bench](https://github.com/SWE-bench/SWE-bench) | Open source | LMs resolve real GitHub issues; Docker harness, instance IDs; standard for code-agent evals. |
| [AgentBench](https://github.com/THUDM/AgentBench) | Open source | ICLR'24 benchmark: agents across AlfWorld, DB, knowledge graphs, OS, webshop; Docker Compose, function-calling interface. |
| [inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) | Open source | Inspect AI core: composable eval tasks, sandboxes, scorers, and multi-model runs; the framework behind inspect_evals, not just the task bundle. |
| [WebArena](https://github.com/web-arena-x/webarena) | Open source | Realistic web env (e.g. e‑commerce, CMS, dev tools); 812 tasks; measures end-to-end web agent success. |
| [WebVoyager](https://github.com/MinorJerry/WebVoyager) | Open source | End-to-end web agent with LMMs: screenshots + actions on real sites; benchmark on 15 sites, GPT-4V for automatic eval. |
| [ARC-AGI-2](https://github.com/arcprize/ARC-AGI-2) | Open source | ARC Prize task set: grid-based abstraction/reasoning; public and private splits for generalization. |
| [swe-smith](https://github.com/SWE-bench/SWE-smith) | Open source | Data generation for SWE agents; 50k+ instances across 128 repos; used for SWE-agent-LM training. |
| [SWE-Gym](https://github.com/SWE-Gym/SWE-Gym) | Open source | Training and evaluation for SWE agents and verifiers (ICML 2025). |
| [inspect_evals](https://github.com/UKGovernmentBEIS/inspect_evals) | Open source | UK AISI/Arcadia/Vector: GAIA and other evals in Inspect AI; level 1–3, sandboxed, tool-calling solvers. |
| [Terminal-Bench](https://github.com/harbor-framework/terminal-bench) | Open source | The terminal-task benchmark coding agents now cite next to SWE-bench: hard, containerized terminal tasks scored end to end. Terminal-Bench 2.0 runs on the harbor evaluation framework; the 1.0 tasks live on in the org's terminal-bench-1 repo. |
| [arc-agi-benchmarking](https://github.com/arcprize/arc-agi-benchmarking) | Open source | Runner for ARC-AGI: multi-provider (OpenAI, Anthropic, Gemini, etc.), rate limits, retries, and scoring. |
| [agent-qa](https://github.com/vostride/agent-qa) | Unclear | Self-improving QA **harness** for web and mobile apps: natural-language tests, memory-backed self-healing, dashboard/CLI, MCP and skills support, plus sandboxed hooks for production regression checks. |
| [VitaBench](https://github.com/meituan-longcat/vitabench) | Open source | ICLR'26: 66 tools, real-world apps (delivery, travel, retail); 100 cross-scenario + 300 single-scenario tasks; adopted by Qwen/Seed. |
| [AgencyBench](https://github.com/GAIR-NLP/AgencyBench) | Open source | Long-horizon agent benchmark: 32 scenarios, 138 tasks, ~1M tokens and ~90 tool calls; Docker sandbox and rubric-based + LLM judges. |
| [letta-evals](https://github.com/letta-ai/letta-evals) | Open source | Eval harness for stateful Letta agents; configurable suites and grading (LLM or rule-based) so you can measure what you ship. |
| [SUPER](https://github.com/allenai/super-benchmark) | Open source | Agents that set up and run ML/NLP from GitHub repos; 45 expert problems, 152 masked tasks, 602 AutoGen tasks; Docker-based. |
| [Simple Strands Agent](https://github.com/strands-labs/benchmark-harnesses) | Open source | A minimal, configurable autonomous software-engineering harness for running multiple model providers in Docker-backed benchmark environments. |
| [TRAIL](https://github.com/patronus-ai/trail-benchmark) | Open source | Trace reasoning and agentic issue localization; 148 long-context traces, 841 errors, 20+ error types; Hugging Face dataset. |

## Observability and eval-ops (4)

Tracing, monitoring, and production evaluation for live agent runs: capture every step, tool call, and token, then score and debug in the loop. Distinct from the fixed-task benchmarks above—this is what you run against your own traffic.

| Project | Availability | Description |
| --- | --- | --- |
| [Langfuse](https://github.com/langfuse/langfuse) | Open source | Open-source LLM engineering platform: full-trace observability, online and offline evals, prompt management, and cost metrics for agent runs in production—the monitoring layer most harnesses lack out of the box. |
| [MLflow](https://github.com/mlflow/mlflow) | Open source | Mature ML platform now covering GenAI: MLflow Tracing captures every agent step, tool call, and token, with built-in LLM evals and prompt versioning—observability for teams already standardized on MLflow. |
| [Opik](https://github.com/comet-ml/opik) | Open source | Comet's open-source agent observability and evaluation platform: tracing, scoring, and experiment comparison with the whole core feature set free to self-host under Apache-2.0. |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix) | Unclear | Arize's source-available, local-first tracing and eval layer: run it on your laptop or your own infra, and graduate to the managed Arize AX platform only when you need it. |

## Research and task-specific harnesses (7)

Deep research, document QA, and domain-specific agent loops.

| Project | Availability | Description |
| --- | --- | --- |
| [DeerFlow](https://github.com/bytedance/deer-flow) | Open source | ByteDance's long-horizon research **harness**: a LangGraph-based agent loop that researches, codes, and creates using sandboxes, memory, tools, and subagents behind a message gateway—an alternative to the reference gpt-researcher stack for multi-hour tasks. |
| [gpt-researcher](https://github.com/assafelovic/gpt-researcher) | Open source | Autonomous deep-research agent: web + local sources, citation-grounded reports, multi-agent and deep-research modes. The reference open-source research harness. |
| [AutoResearchClaw](https://github.com/aiming-lab/AutoResearchClaw) | Unclear | Fully autonomous, self-evolving research **harness**: multi-agent debate and citation verification carry a project from idea to a written paper without a human in the loop. |
| [MiroThinker](https://github.com/MiroMindAI/MiroThinker) | Unclear | Deep-research **harness** tuned for long browsing-and-reasoning chains; benchmarked on BrowseComp, GAIA, and HLE by pairing a dedicated agent loop with its own MiroThinker models rather than bolting search onto a generic chat agent. |
| [openagents](https://github.com/OpenAgentsInc/openagents) | Open source | Platform for autonomous agents and autopilot-style workflows; decentralized/Nostr-oriented (Pylon runtime, actively shipped in 2026). |
| [Continual Harness](https://github.com/sethkarten/continual-harness) | Open source | A research framework for online, reset-free adaptation of an agent's prompts, subagents, skills, and memory while it acts in an environment. |
| [MemoHarness](https://github.com/HowieHwong/MemoHarness) | Unclear | A research harness that learns case-specific orchestration, tool, context, memory, decoding, and validation choices from prior execution experience. |

## Libraries and SDKs (20)

Lightweight runtimes, tool loops, and provider-agnostic harness primitives.

| Project | Availability | Description |
| --- | --- | --- |
| [Daytona](https://github.com/daytonaio/daytona) | Open source | Elastic dev environments for AI-generated code: workspaces, Git, previews—infra harness between "the model wrote a patch" and "it ran in a real machine." ⚠️ Public repo unmaintained since June 2026: core development moved to a private codebase (final open release v0.190.0, AGPL-3.0). |
| [LiteLLM](https://github.com/BerriAI/litellm) | Open source | One interface to 100+ LLMs; routing, caching, budgets. Not an agent framework—the pipe every agent framework uses. |
| [Composio](https://github.com/ComposioHQ/composio) | Open source | 1,000+ toolkits with auth, tool search, and a sandboxed workbench—drop-in tool layer so agents stop reinventing OAuth + integrations. Python and TypeScript. |
| [smolagents](https://github.com/huggingface/smolagents) | Open source | Code-as-action agents: model outputs Python executed in sandbox (E2B, Modal, etc.); ~1k LOC core. |
| [deepagents](https://github.com/langchain-ai/deepagents) | Open source | LangChain's Python+TypeScript agent harness on top of LangGraph: planning tool, virtual filesystem, shell sandbox, sub-agent spawning—the "Claude Code-style" harness as a reusable library. |
| [vercel/ai](https://github.com/vercel/ai) | Open source | React and Node SDK for streaming, tool calls, and agent-style UIs; provider-agnostic. |
| [pydantic-ai](https://github.com/pydantic/pydantic-ai) | Open source | Type-safe Python agents with Pydantic I/O; multi-provider, MCP, Logfire observability, and human-in-the-loop. |
| [E2B](https://github.com/e2b-dev/E2B) | Open source | Firecracker sandboxes for executing agent-generated code; the hosted isolation layer many tool-calling demos use instead of running arbitrary LLM output on your laptop. |
| [Steel](https://github.com/steel-dev/steel-browser) | Open source | Open-source browser API for agents: cloud or self-hosted Chrome sessions with stealth, residential proxies, CAPTCHA solving, and persistent profiles. The only open-source core in the hosted browser-infrastructure lane (Browserbase and Hyperbrowser are closed). |
| [strands-agents](https://github.com/strands-agents/harness-sdk) | Open source | Model-driven Python SDK; decorators for tools, native MCP, multi-agent; "minimal code" without sacrificing provider choice. |
| [Cloudflare Agents](https://github.com/cloudflare/agents) | Open source | Persistent, stateful agents on Durable Objects: state, websockets, scheduling, and AI chat baked in. The serverless answer to "where does the agent live?" |
| [openai-agents-js](https://github.com/openai/openai-agents-js) | Open source | Official OpenAI Agents SDK for Node/TS: handoffs, guardrails, voice; the JS counterpart to openai-agents-python. |
| [Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox) | Open source | Kubernetes-native sandbox primitive for agent runtimes: a Sandbox resource plus warm pools and claims for fast-start, isolated, stateful workloads. The self-hosted answer to hosted sandbox APIs, from the Kubernetes SIGs org. |
| [sandbox-agent](https://github.com/rivet-dev/sandbox-agent) | Open source | An HTTP and CLI control layer for running Claude Code, Codex, OpenCode, and Amp inside sandboxes. |
| [open-harness](https://github.com/MaxGfeller/open-harness) | Open source | TypeScript Agent class on Vercel AI SDK; streaming events, filesystem/bash tools, MCP, and subagent delegation. |
| [UniHarness](https://github.com/UnicomAI/UniHarness) | Open source | A model-independent computer-use harness that places agents in isolated machines while keeping credentials and control-plane logic outside the sandbox. |
| [LiteHarness](https://github.com/LiteLLM-Labs/lite-harness) | Open source | A unified server and SDK interface for running Claude Code, Codex, Pi, and other harness implementations behind consistent APIs. |
| [OpenAgentHarness](https://github.com/fairyshine/OpenAgentHarness) | Unclear | An extensible open agent runtime for coding, learning, and experimentation, with workspace instructions, tools, skills, memory, and model configuration. |
| [Community-curated agent lists](https://github.com/brandonhimpfen/awesome-ai-agents) | Unclear | Broader directories: e.g. [brandonhimpfen/awesome-ai-agents](https://github.com/brandonhimpfen/awesome-ai-agents), [axioma-ai-labs/awesome-ai-agent-frameworks](https://github.com/axioma-ai-labs/awesome-ai-agent-frameworks), [mb-mal/awesome-ai-agents-frameworks](https://github.com/mb-mal/awesome-ai-agents-frameworks)—differ by scope and update cadence. |
| [AgentHarness.rb](https://github.com/viamin/agent-harness) | Open source | A Ruby library and CLI that exposes a unified programmatic interface to installed coding-agent CLIs. |


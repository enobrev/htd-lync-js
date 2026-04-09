# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**htd-lync-js** is a TypeScript library for controlling HTD Lync12 home audio systems via their proprietary binary protocol over TCP/IP. It provides command building, response parsing, and socket management.

## Commands

- **Build:** `pnpm build` (runs `tsc`, outputs to `dist/`)
- **Test:** `pnpm test` (runs vitest)
- **Run single test:** `pnpm vitest run tests/<filename>.test.ts`
- **Dev server:** `pnpm dev` (vite dev server)
- **Live hardware test:** `pnpm dev_status` (runs `dev/status.ts` against a real Lync12)

## Architecture

Four core modules exported from `src/index.ts`:

- **Protocol** (`src/Protocol.ts`) — Static factory methods that build binary command buffers. Each method constructs a packet: `[Header, IsVolume, Zone, Command, Data..., Checksum]`. Checksum is XOR-based sum masked to 0xFF.

- **Parser** (`src/Parser.ts`) — Parses binary response buffers into typed discriminated union (`LyncResponse`). Handles fragmented/partial TCP data via `previous_result` buffer carry-over. Variable-length packet detection based on response type byte.

- **Connector** (`src/Connector.ts`) — TCP socket manager using `promise-socket`. Lazy-connects on first `send_command()`. Routes parsed responses to a `TypedEventEmitter` with events like `status`, `id`, `system`, `error`, `mp3:*`, etc.

- **Lookup** (`src/Lookup.ts`) — Value validation (volume 0-60, balance -18 to 18, tone -10 to 10) and signed/unsigned byte conversion utilities.

## Key Patterns

- **ESM-only** (`"type": "module"`, target `es2022`)
- Tests use `describe.concurrent()` and `test.concurrent.each()` for parallel parameterized assertions against expected binary output
- Source/zone identifiers are hex constants (e.g., `Zone._01 = 0x00`, `Source._01 = 0x10`)
- `set_source_number()` and `set_party_mode_number()` use 1-based index lookup into source arrays

## Hardware Quirks (from README)

- Some commands (volume, bass, treble, balance) require re-setting the source afterwards to take effect
- MP3 repeat status is only readable via zone status events
- Echo mode affects whether the controller re-emits events
- Reference hex codes are in `reference/hex_codes/` with decimal conversions in `reference/decimal/`

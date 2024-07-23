# HTD Lync12 Library

This library is meant to be used to interact with an HTD Lync 12

## Installation

```shell
npm install htd-lync-js
```

## Lync Serial Hex Codes Documentation

https://www.htd.com/site/ownersmanual/lync_hex_codes.pdf

## Useful Commands

### Run Converter

```shell
pnpm dlx vite-node dev/reference_hex_to_dec.ts reference/hex_codes/by_function.txt reference/decimal/by_function.txt
pnpm dlx vite-node dev/reference_hex_to_dec.ts reference/hex_codes/by_name.txt reference/decimal/by_name.txt
pnpm dlx vite-node dev/reference_hex_to_dec.ts reference/hex_codes/by_zone.txt reference/decimal/by_zone.txt
pnpm dlx vite-node dev/reference_hex_to_dec.ts reference/hex_codes/by_code.txt reference/decimal/by_decimal.txt

# Paste the output of this into the resulting file
cat reference/decimal/by_decimal.txt | sort --version-sort
```

### Dev Tests

This is just a file I use to test against my own system.

```shell
pnpm dlx vite-node dev/dev.ts
```

## Usage / Dev Notes

It seems in order for some commands to take, you need to set the source afte the command.  For instance, if you 
want to update the volume, bass, treble, etc, those settings won't take unless you also update the source.

For this, it's a good idea to keep track of the source of a zone, so that you can re-set it to the same source.

In the following example, none of these "set_[property]" commands will take, until you call `set_source`.  At that
point, you'll get a response from the Controller with the updated settings.

```typescript
const zone = Zone._01;
const source = Source._01;

await LC.send_command(Command.set_volume(zone, 25));
await LC.send_command(Command.set_bass(zone, 2));
await LC.send_command(Command.set_treble(zone, 2));
await LC.send_command(Command.set_balance(zone, 0));
await LC.send_command(Command.set_source(zone, source));
```
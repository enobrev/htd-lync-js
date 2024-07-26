# What are these files?

I parsed the [PDF that documents the Serial Codes](https://www.htd.com/site/ownersmanual/lync_hex_codes.pdf) into
`hex_codes/by_name.tf`, and then found that adjusting and re-sorting (using `sort --version-sort`) helped me figure out
the patterns in their commands.

And then I wrote `dev/reference_hex_to_dec.ts`, which converts the hex codes to decimal.  This was mostly to help sort better since
the sort command doesn't grok hexidecimal, and that helped out even more when tying to figure out the command patterns.

I found all versions to be incredibly useful in one facet or another, so I kept them all.

I used the `by_function` file to generate my tests for documented commands

| type                   | description                                                 |
|:-----------------------|:------------------------------------------------------------|
| by_name                | Sorted by Original Name from Docs                           |
| by_zone                | Moved the Zone to the Front of the Name and then sorted     |
| by_function            | Moved the Function to the Front of the Name and then sorted |
| by_code and by_decimal | Moved the code to the left column and then sorted           |
| other                  | Has other commands that were not in the docs                |


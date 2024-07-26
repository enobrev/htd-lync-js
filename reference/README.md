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


# And the PDFs?

I grabbed those from [this repo](https://github.com/UngluedChalice/HTD-Lync-RS232-Serial-Feedback-Query-Codes), where 
they said "I emailed HTD frustrated with the lack of integrations with Home Assisstant and they emailed me back all this
info. I have no clue what any of it means."

I put most of this app together by decompiling their app and looking at other sources and sending random commands
to my own Lync.  These docs helped fill in some gaps.
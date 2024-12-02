import { TextLineStream } from "jsr:@std/streams@0.224.0/text-line-stream";

export default function readLines(file: Deno.FsFile) {
  return file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
}

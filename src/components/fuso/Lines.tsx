import { Fragment } from "react";

/** Texto en varias líneas con saltos deliberados (títulos editoriales). */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && (
            <>
              {" "}
              <br />
            </>
          )}
          {line}
        </Fragment>
      ))}
    </>
  );
}

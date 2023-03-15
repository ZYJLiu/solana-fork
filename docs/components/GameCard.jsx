import React from "react";
import styles from "../src/pages/styles.module.css";
import Translate from "@docusaurus/Translate";

function GameCard({
  tutorial,
  source,
  example,
  header,
  body,
  externalIcon = false,
}) {
  return (
    <div className="navbar__link card">
      <div className="card__header">
        <h3>
          <Translate description={header.translateId}>{header.label}</Translate>
          {externalIcon && (
            <svg
              width="13.5"
              height="13.5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={styles.iconExternalIcon}
            >
              <path
                fill="currentColor"
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              ></path>
            </svg>
          )}
        </h3>
      </div>

      {typeof body === "object" && (
        <div className="card__body">
          <p>
            <Translate description={body.translateId}>{body.label}</Translate>
          </p>
        </div>
      )}
      <br />
      <div class="container">
        <div class="row">
          {example && (
            <div class="col-sm">
              <a className="navbar__link card" href={example} target="_blank">
                <Translate description="example">Live Example</Translate>
              </a>
            </div>
          )}
          {tutorial && (
            <div class="col-sm">
              <a className="navbar__link card" href={tutorial} target="_blank">
                <Translate description="Tutorial">Tutorial</Translate>
              </a>
            </div>
          )}
          {source && (
            <div class="col-sm">
              <a className="navbar__link card" href={source} target="_blank">
                <Translate description="source">Source Code</Translate>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameCard;

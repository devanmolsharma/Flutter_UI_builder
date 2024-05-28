"use client";
import styles from "./page.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { WidgetsList } from "./components/WidgetList/";
import { ParametersList } from "./components/ParamtersList";
import Block from "./Block";
import config from "./config";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Server } from "./utils/Server";
import json from "../../public/Fetcher/elements.json";
export default function Home() {
  let widgets: Widget[] = json as any;
  const [selectedBlock, setSelectedBlock] = useState<Block>();
  const [iframeKey, setIframeKey] = useState(0);
  const server = new Server(config.host);
  let [baseBlock, setBaseBlock] = useState(
    new Block(widgets.find((v) => v.name == "Scaffold")!, "Scaffold")
  );

  const [code, setCode] = useState("");

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "inject_dartpad.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [code]);

  return (
    <div className="h-[95vh] bg-gray-800 flex-column">
      <button
        className="bg-green-700 p-2 border-1 absolute top-4 right-20 rounded"
        onClick={(e) => {
          const btn = e.target as HTMLButtonElement;
          const regex = /\/\*[^]*?\*\//im;
          const match = code.match(regex);
          if (match) {
            const commentContent = match[0].slice(2, -2).trim();
            if (commentContent) {
              console.log("The comment is not null:", commentContent);
            } else {
              alert(
                'AI Bulder is useful ony when an Event is defined for a widget. For Example, Try adding a TextButton and navigate to "Events" in property bar'
              );
              return;
            }
          } else {
            alert(
              'AI Bulder is useful ony when an Event is defined for a widget. For Example, Try adding a TextButton and navigate to "Events" in property bar'
            );
            return;
          }
          btn.disabled = true;
          server
            .uploadWidgets(baseBlock, true)
            .then((res) => {
              setIframeKey(iframeKey + 1);
              setCode(res.code);
              btn.disabled = false;
            })
            .catch((err) => {
              btn.disabled = false;
            });
        }}
      >
        Compile with AI
      </button>
      <NavigationBar />
      <div className="flex w-full md:h-full flex-col md:flex-row">
        <div className="flex-1">
          <WidgetsList
            widgets={widgets}
            onBlocksChange={(block) => {
              server.uploadWidgets(baseBlock).then((res) => {
                setIframeKey(iframeKey + 1);
                setCode(res.code);
              });
            }}
            onBlockSelected={(block) => {
              setSelectedBlock(block);
            }}
            baseBlock={baseBlock}
            setBaseBlock={setBaseBlock}
          />
        </div>
        <div
          className="h-full flex-[3] p-4 bg-gray-800 max-md:order-3"
          key={iframeKey}
        >
          <pre>
            <code
              className="language-dart"
              data-dartpad="true"
              data-width="100%"
              data-height="90vh"
            >
              {code}
            </code>
          </pre>
        </div>
        {selectedBlock && (
          <div className={styles.section}>
            <ParametersList
              selectedBlock={selectedBlock}
              onExit={() => setSelectedBlock(undefined)}
              onPropChange={() => {
                baseBlock &&
                  server.uploadWidgets(baseBlock).then((res) => {
                    setIframeKey(iframeKey + 1);
                    setCode(res.code);
                  });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

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
  const server = new Server("http://localhost");
  let [baseBlock, setBaseBlock] = useState(
    new Block(widgets.find((v) => v.name == "Scaffold")!, "Scaffold")
  );

  return (
    <div className="h-[95vh] bg-gray-800 flex-column">
      <NavigationBar />
      <div className="flex w-full h-full">
        <div className="flex-1">
          <WidgetsList
            widgets={widgets}
            onBlocksChange={(block) => {
              server
                .uploadWidgets(block)
                .then(() =>
                  server.renderChanges().then(() => setIframeKey(iframeKey + 1))
                );
            }}
            onBlockSelected={(block) => {
              setSelectedBlock(block);
            }}
            baseBlock={baseBlock}
            setBaseBlock={setBaseBlock}
          />
        </div>
        <div className="h-full flex-[3] p-4 bg-gray-800">
          <iframe
            key={iframeKey}
            className="w-full h-full rounded"
            id="flutterview"
            src={`${config.host}:9998/`}
          ></iframe>
        </div>
        {selectedBlock && (
          <div className={styles.section}>
            <ParametersList
              selectedBlock={selectedBlock}
              onExit={() => setSelectedBlock(undefined)}
              onPropChange={() => {
                baseBlock &&
                  server
                    .uploadWidgets(baseBlock)
                    .then(() =>
                      server
                        .renderChanges()
                        .then(() => setIframeKey(iframeKey + 1))
                    );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

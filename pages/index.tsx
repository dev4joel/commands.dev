import Head from "next/head";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle, siteDescription } from "../components/layout";
import { WorkflowCards } from "../components/WorkflowCard";
import { Workflow } from "warp-workflows";
import { WarpTextIcon } from "../components/icons/text_logo";
import * as gtag from "../lib/gtag";

export default function Home({
  allWorkflowsData,
}: {
  allWorkflowsData: Workflow[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      <main className="grow">
        <div className="bg-cover text-black dark:text-white">
          <div className="py-10 px-3 max-w-2xl">
            <h1 className="md:text-3xl text-3xl font-bold">
              Find commands at the speed of thought
            </h1>
            <div className="text-l font-normal mt-4 text-back dark:text-white max-w-2xl">
              {siteDescription}
            </div>
            <div className="text-xs pt-2">Powered by</div>
            <div className="pt-2 w-[5.45rem]">
              <a
                href="https://www.warp.dev/"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  gtag.event({
                    action: "click_on_powered_by_landing_page",
                    category: "Click on Landing Page",
                    label: "Click on Landing Page via 'Powered By'",
                    value: "/",
                  });
                }}
              >
                <WarpTextIcon />
              </a>
            </div>
          </div>
        </div>
        {<WorkflowCards workflows={allWorkflowsData} isSearchResults={false} />}
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allWorkflowsData = getSortedWorkflowsData();
  return {
    props: {
      allWorkflowsData,
    },
  };
};

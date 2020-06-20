import Layout from "../../components/layout";
import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "./../../components/date";
import Styles from "./../../style/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={Styles.headingXl}>{postData.title}</h1>
        <div className={Styles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

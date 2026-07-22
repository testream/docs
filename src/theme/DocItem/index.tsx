import Head from '@docusaurus/Head';
import DocItem from '@theme-original/DocItem';
import type {Props} from '@theme/DocItem';

const docsOrigin = 'https://docs.testream.app';

export default function DocItemWithStructuredData(props: Props) {
  const {metadata} = props.content;
  const url = new URL(metadata.permalink, docsOrigin).toString();

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: metadata.title,
            description: metadata.description,
            url,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Testream Documentation',
              url: `${docsOrigin}/`,
            },
            about: {
              '@type': 'SoftwareApplication',
              name: 'Testream',
              applicationCategory: 'Test management',
              operatingSystem: 'Jira Cloud',
              url: 'https://testream.app/',
            },
          })}
        </script>
      </Head>
      <DocItem {...props} />
    </>
  );
}

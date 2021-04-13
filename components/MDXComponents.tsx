import * as React from 'react';
import NextLink from 'next/link';
import * as DS from '@modulz/design-system';
import { ChevronDownIcon, Link2Icon } from '@radix-ui/react-icons';
import { PropsTable } from './PropsTable';
import { KeyboardTable } from './KeyboardTable';
import { HeroSlot } from './HeroSlot';
import { Pre } from './Pre';
import { Preview } from './Preview';
import { PackageRelease, PRLink } from './releaseHelpers';
import * as accordionDemos from './Demo/Accordion';
import * as alertDialogDemos from './Demo/AlertDialog';
import * as avatarDemos from './Demo/Avatar';
import * as checkboxDemos from './Demo/Checkbox';

const LinkHeading = ({
  id,
  children,
  css,
}: {
  id: string;
  children: React.ReactNode;
  css?: any;
}) => (
  <DS.Box css={{ ...css }}>
    <DS.Box
      as="a"
      href={`#${id}`}
      // used by `scrollToUrlHash`
      // not using the `id` attribute for that because we may get ids that start with a number
      // and that is not a valid css selector
      data-id={id}
      css={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        svg: {
          opacity: 0,
        },
        '&:hover svg': {
          opacity: 1,
        },
      }}
    >
      {children}
      <DS.Box as="span" css={{ ml: '$2', color: '$slate500' }}>
        <Link2Icon aria-hidden />
      </DS.Box>
    </DS.Box>
  </DS.Box>
);

export const components = {
  ...DS,
  h1: (props) => <DS.Text size="6" {...props} css={{ mb: '$8', fontWeight: 500 }} as="h1" />,
  h2: ({ children, id, ...props }) => (
    <LinkHeading id={id} css={{ mt: '$7', mb: '$5' }}>
      <DS.Heading
        {...props}
        id={id}
        size="7"
        css={{
          fontWeight: 500,
          scrollMarginTop: '$6',
        }}
        as={'h3' as any}
        data-heading
      >
        {children}
      </DS.Heading>
    </LinkHeading>
  ),
  h3: ({ children, id, ...props }) => (
    <LinkHeading id={id} css={{ mt: '$7', mb: '$1' }}>
      <DS.Heading
        {...props}
        id={id}
        size="7"
        css={{
          fontSize: '19px',
          lineHeight: '23px',
          fontWeight: 500,
          scrollMarginTop: '$6',
        }}
        as={'h4' as any}
        data-heading
      >
        {children}
      </DS.Heading>
    </LinkHeading>
  ),
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, id, showLineNumbers = false, collapsed = false }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const collapsedStyles = {
      height: '100px',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: `''`,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to bottom, transparent 30%, $loContrast)',
      },
    };
    return (
      <Pre
        as="pre"
        // variant="blue"
        css={{
          my: '$5',
          ...(isCollapsed ? (collapsedStyles as any) : {}),
          '[data-preview] + &': {
            marginTop: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
        className={className}
        id={id}
        data-line-numbers={showLineNumbers}
      >
        {isCollapsed && (
          <DS.Box
            css={{
              position: 'absolute',
              left: 0,
              zIndex: 1,
              bottom: '$2',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <DS.Button onClick={() => setIsCollapsed(false)}>
              <ChevronDownIcon />{' '}
              <DS.Box as="span" css={{ ml: '$2' }}>
                Show code
              </DS.Box>
            </DS.Button>
          </DS.Box>
        )}
        <code className={className} children={children} />
      </Pre>
    );
  },
  p: (props) => (
    <DS.Text
      size="4"
      {...props}
      css={{ mb: '$3', lineHeight: '27px', letterSpacing: 0, ...props.css }}
      as="p"
    />
  ),
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <DS.Link
          variant="blue"
          href={href}
          {...props}
          css={{
            fontSize: 'inherit',
            ...props.css,
          }}
          target="_blank"
          rel="noopener"
        />
      );
    }
    return (
      <NextLink href={href} passHref>
        <DS.Link
          {...props}
          css={{
            color: 'inherit',
            fontSize: 'inherit',
            ...props.css,
          }}
        />
      </NextLink>
    );
  },
  hr: (props) => <DS.Separator size="2" {...props} css={{ my: '$6', mx: 'auto', ...props.css }} />,
  inlineCode: (props) => <DS.Code {...props} />,
  ul: (props) => (
    <DS.Box {...props} css={{ color: '$hiContrast', mb: '$3', ...props.css }} as="ul" />
  ),
  ol: (props) => (
    <DS.Box {...props} css={{ color: '$hiContrast', mb: '$3', ...props.css }} as="ol" />
  ),
  li: (props) => (
    <li>
      <DS.Text size="4" {...props} css={{ lineHeight: '30px', letterSpacing: 0, ...props.css }} />
    </li>
  ),
  strong: (props) => (
    <DS.Text
      {...props}
      css={{ ...props.css, display: 'inline', fontSize: 'inherit', fontWeight: 500 }}
    />
  ),
  img: ({ ...props }) => (
    <DS.Box css={{ my: '$6' }}>
      <DS.Box
        as="img"
        {...props}
        css={{ maxWidth: '100%', verticalAlign: 'middle', ...props.css }}
      />
    </DS.Box>
  ),
  blockquote: (props) => (
    <DS.Box
      css={{
        mt: '$6',
        mb: '$5',
        pl: '$4',
        borderLeft: `1px solid $gray400`,
        color: 'orange',
        '& p': {
          fontSize: '$3',
          color: '$gray900',
          lineHeight: '25px',
        },
      }}
      {...props}
    />
  ),
  Note: (props) => (
    <DS.Box
      as="aside"
      css={{
        mt: '$6',
        mb: '$3',
        py: '$2',
        px: '$3',
        bc: '$yellow100',
        border: '1px solid $yellow400',
        borderRadius: '$2',
        '& p': {
          fontSize: '$3',
          color: '$yellow900',
          lineHeight: '21px',
          margin: 0,
        },
      }}
      {...props}
    />
  ),
  Kbd: DS.Kbd,
  Code: DS.Code,
  PropsTable: (props) => (
    <DS.Box css={{ mb: '$5' }}>
      <PropsTable {...props} />
    </DS.Box>
  ),
  KeyboardTable: (props) => (
    <DS.Box css={{ mb: '$5' }}>
      <KeyboardTable {...props} />
    </DS.Box>
  ),
  Preview,
  HeroSlot,
  PackageRelease,
  PRLink,
  ...accordionDemos,
  ...alertDialogDemos,
  ...avatarDemos,
  ...checkboxDemos,
};

// src/pages/StyleGuide/StyleGuide.tsx
import React from 'react'

// Layout
import { Flex } from '../../components/Flex'
import { Grid } from '../../components/Grid'

// Inputs & Controls
import { Accordion } from '../../components/Accordion'
import { Alert } from '../../components/Alert'
import { Avatar } from '../../components/Avatar'
import { AvatarGroup } from '../../components/AvatarGroup'
import { Badge } from '../../components/Badge'
import { Banner } from '../../components/Banner'
import { Button } from '../../components/Button'
import IconButton from '../../components/IconButton'
import { Checkbox } from '../../components/Checkbox'
import { Radio } from '../../components/Radio'
import { Switch } from '../../components/Switch'
import { Slider } from '../../components/Slider'
import SizePicker from '../../components/SizePicker'
import { Input } from '../../components/Input'
import { Dropdown } from '../../components/Dropdown'
import Menu from '../../components/Menu'
import { Modal } from '../../components/Modal'
import { Toast } from '../../components/Toast'

// Data display
import { Table } from '../../components/Table'
import { TableRow } from '../../components/TableRow'
import { TableCell } from '../../components/TableCell'
import { List } from '../../components/List'
import ListItem from '../../components/ListItem'
import { Divider } from '../../components/Divider'
import { ProgressBar } from '../../components/ProgressBar'
import { Tag } from '../../components/Tag'

// Media & Icons
import Icon from '../../components/Icon'
import { Tooltip } from '../../components/Tooltip'
import ProductCard from '../../components/ProductCard'
import { BlogCard } from '../../components/BlogCard'
import { BlogCategories } from '../../components/BlogCategories'

// Panels & Boxes
import BorderedPanel from '../../components/BorderedPanel'
import Box from '../../components/Box'

// sample data
import { products } from '../../data/products'
import type { Post as BlogPost } from '../../data/blogPosts'
import { blogPosts } from '../../data/blogPosts'
import CharacterAvatar from '../../components/CharacterAvatar'
import { CharacterCallout } from '../../components/CharacterCallout'

export default function StyleGuide() {
  const sampleProduct = { ...products[0], slug: products[0].id.toString() }
  const samplePost: BlogPost = blogPosts[0]
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)))

    const rex = {
    id: 'rex',
    name: 'Rex',
    bio:
      'Rex is the Mayor of Binaryville, and a well-loved personality in town. He rose to robotdom from a microprocessor plant on the south side of town, where many famous and influential robots before him were conceived.',
  }

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Component Style Guide</h1>

      {/* Banner */}
      <section>
        <h2 className="text-2xl mb-4">banner</h2>
        <Banner content="Your order qualifies for Free&nbsp;Shipping!" />
      </section>

      {/* Button */}
      <section>
        <h2 className="text-2xl mb-4">button</h2>
        <div className="padding">
          <Button
            href="#"
            label="Button"
            target="_blank"
            type="primary"
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "href": "#",
  "label": "Button",
  "target": "_blank",
  "type": "primary"
}`}
        </pre>
      </section>

      {/* Inputs & Controls */}
      <section>
        <h2 className="text-2xl mb-4">Inputs & Controls</h2>
        <div className="flex flex-wrap gap-4">
          <Accordion
            items={[
              { title: 'Section 1', content: <div>Content 1</div> },
              { title: 'Section 2', content: <div>Content 2</div> },
            ]}
          />
          <Alert variant="info">This is an info alert</Alert>
          <Avatar src="/path/to/avatar.jpg" alt="User avatar" />
          <AvatarGroup
            images={[
              { src: '/a.jpg', alt: 'A' },
              { src: '/b.jpg', alt: 'B' },
            ]}
          />
          <Badge>9</Badge>
          <Button label="Primary" onClick={() => {}} />
          <IconButton icon="star" aria-label="star" />
          <Checkbox checked={false} onChange={() => {}} />
          <Radio name="r" value="1" checked={false} onChange={() => {}} />
          <Switch checked={false} onChange={() => {}} />
          <Slider min={0} max={100} value={50} onChange={() => {}} />
          <SizePicker
            availableSizes={['S', 'M', 'L']}
            selectedSize="M"
            onChange={() => {}}
          />
          <Input value="" onChange={() => {}} placeholder="Type…" />
          <Dropdown />
          <Menu
            isOpen
            onClose={() => {}}
            options={['One', 'Two']}
            onSelectOption={() => {}}
          />
          <Modal isOpen onClose={() => {}}>
            <div className="p-4">Modal content</div>
          </Modal>
          <Toast message="This is a toast" onClose={() => {}} />
        </div>
      </section>

      {/* Data Display */}
      <section>
        <h2 className="text-2xl mb-4">Data Display</h2>
        <Table>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </Table>
        <List>
          <ListItem>Item</ListItem>
        </List>
        <Divider />
        <ProgressBar value={50} max={100} />
        <Tag>New</Tag>
      </section>

      {/* Media & Icons */}
      <section>
        <h2 className="text-2xl mb-4">Media & Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Icon name="heart" size={24} />
          <Tooltip content="Tooltip text">
            <Button label="Hover me" onClick={() => {}} />
          </Tooltip>
          <ProductCard product={sampleProduct} />
          <BlogCard post={samplePost} />
        </div>
      </section>

      {/* Blog Categories */}
      <section>
        <h2 className="text-2xl mb-4">blog-categories</h2>
        <BlogCategories
          categories={allCategories}
          selected={allCategories[1]}
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "categories": ${JSON.stringify(allCategories)},
  "selected": "${allCategories[1]}",
  "basePath": "/blog/categories"
}`}
        </pre>
      </section>

      {/* Bordered Panel */}
      <section>
        <h2 className="text-2xl mb-4">bordered-panel</h2>
        <BorderedPanel
          as="div"
          borderColor="blue-00bff3"
          backgroundColor="olive-9aa665"
        />
        <pre className="p-2 font-mono text-sm">
{`[
  "div",
  "blue-00bff3",
  "olive-9aa665"
]`}
        </pre>
      </section>

      {/* Box */}
      <section>
        <h2 className="text-2xl mb-4">box</h2>
        <div className="padding">
          <Box
            backgroundColor="blue-dcf0fb"
            padding={32}
            style={{ height: 200, width: 200 }}
          >
            <p>I'm a generic box</p>
          </Box>
        </div>
        <pre className="p-2 font-mono text-sm">
{`[
  "",
  "",
  "style=\\"height:200px; width:200px;\\""
]`}
        </pre>
      </section>

      {/* Character Avatar */}
      <section>
        <h2 className="text-2xl mb-4">character-avatar</h2>
        <div className="padding">
          <CharacterAvatar
            name="Rex"
            src="/images/characters/rex-disc.png"
            href="/about/rex/"
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "Rex",
  "src": "/images/characters/rex-disc.png",
  "href": "/about/rex/"
}`}
        </pre>
      </section>

      {/* Character Callout */}
      <section>
        <h2 className="text-2xl mb-4">character-callout</h2>
        <div className="padding">
          <CharacterCallout character={rex} />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "id": "rex",
  "name": "Rex",
  "bio": "Rex is the Mayor of Binaryville, and a well-loved personality in town. He rose to robotdom from a microprocessor plant on the south side of town, where many famous and influential robots before him were conceived."
}`}
        </pre>
      </section>
    </div>
  )
}
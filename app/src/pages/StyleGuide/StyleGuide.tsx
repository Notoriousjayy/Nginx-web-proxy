// src/pages/StyleGuide/StyleGuide.tsx
import React from 'react'

// Layout
import { Flex } from '../../components/Flex'
import { Grid } from '../../components/Grid'

// Inputs & Controls
import { Accordion } from '../../components/Accordion/Accordion'
import { Alert } from '../../components/Alert'
import { Avatar } from '../../components/Avatar'
import { AvatarGroup } from '../../components/AvatarGroup'
import { Badge } from '../../components/Badge'
import { Banner } from '../../components/Banner'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Radio } from '../../components/Radio'
import { Switch } from '../../components/Switch'
import { Slider } from '../../components/Slider'
import { SizePickerPattern } from '../../components/SizePickerPattern/SizePickerPattern'
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
const CategoryPage       = React.lazy(() => import('../../pages/CategoryPage/CategoryPage'))

// Panels & Boxes
import BorderedPanel from '../../components/BorderedPanel'
import Box from '../../components/Box'

// sample data
import { products } from '../../data/products'
import type { Post as BlogPost } from '../../data/blogPosts'
import { blogPosts } from '../../data/blogPosts'
import CharacterAvatar from '../../components/CharacterAvatar'
import { CharacterCallout } from '../../components/CharacterCallout'
import { CharacterHero, rexCharacter } from '../../components/CharacterHero'
import { ColorPicker } from '../../components/ColorPicker'
import { ContentHero } from '../../components/ContentHero'
import { DesignCallout } from '../../components/DesignCallout'
import { Footer } from '../../layouts/Footer'
import { FormDropdown } from '../../components/FormDropdown'
import { FormLabel } from '../../components/FormLabel'
import { FormSuccessMessage } from '../../components/FormSuccessMessage'
import { FormTextInput } from '../../components/FormTextInput'
import { FormTitle } from '../../components/FormTitle'
import { FormToggleInput } from '../../components/FormToggleInput'
import { FormToggleInputGroup } from '../../components/FormToggleInputGroup'
import { HomeHero } from '../../components/HomeHero'
import { MerchandiseBanner } from '../../components/MerchandiseBanner'
import { PageTitle } from '../../components/PageTitle'
import { Product } from '../../components/Product/Product'
import { PromoCode } from '../../components/PromoCode'
import { QuantityChanger } from '../../components/QuantityChanger'
import { ShopHero } from '../../components/ShopHero'
import { IconButton } from '../../components/IconButton'
import { SocialIcon } from '../../components/SocialIcon/SocialIcon'
import { Swatches } from '../../components/Swatches/Swatches'
import { Svg } from '../../components/Svg/Svg'

export { H2, type H2Props } from '../../components/H2'
export { H3, type H3Props } from '../../components/H3'
export { H4, type H4Props } from '../../components/H4'

export default function StyleGuide() {
  const sampleProduct = { ...products[0], slug: products[0].slug.toString() }
  const samplePost: BlogPost = blogPosts[0]
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)))
  const colorOptions = ['black', 'gray', 'white']

  const [state, setState] = React.useState('Alaska')
  const states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
  ]

  // NEW: demo state for size-picker
  const [selectedSize, setSelectedSize] = React.useState('S')

  const rex = {
    id: 'rex',
    name: 'Rex',
    bio:
      'Rex is the Mayor of Binaryville, and a well-loved personality in town. He rose to robotdom from a microprocessor plant on the south side of town, where many famous and influential robots before him were conceived.',
  }

  const contentHtml = `
    <p class="margin-bottom:24px">
      On the edge of the world stands the progressive town of Binaryville, where technology is a way of life. The robots who live, work, and play in Binaryville learn from an early age that magic is made simply by combining 0’s and 1’s. For the Binaryville robots, every waking thought and every sleeping dream is consumed with unique permutations&hellip; and endless possibilities.
    </p>
    <p>
      This is our happy place, and we invite the dreamers, thinkers, and inventors of the world to unite in our passion for building something out of nothing. (Well, nothing plus 1.) Visit Binaryville and let your imagination soar!
    </p>
  `

  const longLabel = `Lorem Ipsum is simply dummy text of the printing and typesetting
 industry. Lorem Ipsum has been the industry's standard dummy text ever since the
 1500s, when an unknown printer…`

  const oliveOptions = [
    { label: 'Yes' },
    { label: 'No' },
    { label: 'It depends' },
  ]

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Component Style Guide</h1>

      {/* --- Page Title --- */}
      <section>
        <h2 className="text-2xl mb-4">page-title</h2>
        <div className="padding">
          <PageTitle heading="Our Story" />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "heading": "Our Story"
}`}
        </pre>
      </section>

      {/* --- Banner --- */}
      <section>
        <h2 className="text-2xl mb-4">banner</h2>
        <Banner content="Your order qualifies for Free&nbsp;Shipping!" />
      </section>

      {/* --- Button --- */}
      <section>
        <h2 className="text-2xl mb-4">button</h2>
        <div className="padding">
          <Button href="#" label="Button" target="_blank" type="primary" />
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

      {/* --- Inputs & Controls --- */}
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
          <IconButton iconName="star" aria-label="star" />
          <Checkbox checked={false} onChange={() => {}} />
          <Radio name="r" value="1" checked={false} onChange={() => {}} />
          <Switch checked={false} onChange={() => {}} />
          <Slider min={0} max={100} value={50} onChange={() => {}} />
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

      {/* --- Data Display --- */}
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

      {/* --- Media & Icons --- */}
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

      {/* --- Blog Categories --- */}
      <section>
        <h2 className="text-2xl mb-4">blog-categories</h2>
        {/* <BlogCategories
          categories={allCategories}
          selected={allCategories[1]}
        /> */}
        <pre className="p-2 font-mono text-sm">
{`{
  "categories": ${JSON.stringify(allCategories)},
  "selected": "${allCategories[1]}",
  "basePath": "/blog/categories"
}`}
        </pre>
      </section>

      {/* --- Bordered Panel --- */}
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

      {/* --- Box --- */}
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

      {/* --- Character Avatar --- */}
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

      {/* --- Character Callout --- */}
      <section>
        <h2 className="text-2xl mb-4">character-callout</h2>
        <div className="padding">
          <CharacterCallout character={rexCharacter} />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "id": "rex",
  "name": "Rex",
  "bio": ${rexCharacter.bio}
}`}
        </pre>
      </section>

      {/* --- Character Hero --- */}
      <section>
        <h2 className="text-2xl mb-4">character-hero</h2>
        <div className="padding">
          {/* <CharacterHero character={rexCharacter} /> */}
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "id": "rex",
  "name": "Rex",
  "bio": "${rexCharacter.bio}"
}`}
        </pre>
      </section>

      {/* --- Color Picker --- */}
      <section>
        <h2 className="text-2xl mb-4">color-picker</h2>
        <div className="padding">
          <ColorPicker
            colors={colorOptions}
            name="foo"
            variant="small"
            visuallyHiddenLegend
            onChange={(c) => console.log('selected', c)}
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "colors": ${JSON.stringify(colorOptions)},
  "name": "foo",
  "variant": "small",
  "visuallyHiddenLegend": true
}`}
        </pre>
      </section>

      {/* --- Content Hero --- */}
      <section>
        <h2 className="text-2xl mb-4">content-hero</h2>
        <div>
          <ContentHero
            color="blue"
            heading="About"
            content={contentHtml}
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "color": "blue",
  "heading": "About",
  "content": "${contentHtml.replace(/\n/g, '')}"
}`}
        </pre>
      </section>

      {/* --- Design Callout --- */}
      <section>
        <h2 className="text-2xl mb-4">design-callout</h2>
        <div className="padding">
          <DesignCallout name="gumball" />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "gumball"
}`}
        </pre>
      </section>

      {/* --- Footer --- */}
      <section>
        <h2 className="text-2xl mb-4">footer</h2>
        <Footer />
      </section>

      {/* --- FormDropdown --- */}
      <section>
        <h2 className="text-2xl mb-4">form-dropdown</h2>
        <FormDropdown
          label="State"
          name="state"
          options={states}
          selectedOption={state}
          onChange={setState}
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "label": "State",
  "name": "state",
  "options": ${JSON.stringify(states)},
  "selectedOption": "${state}"
}`}
        </pre>
      </section>

      {/* --- Form Label --- */}
      <section>
        <h2 className="text-2xl mb-4">form-label</h2>
        <div className="padding">
          <FormLabel label="First Name" htmlFor="first-name" />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "label": "First Name",
  "htmlFor": "first-name"
}`}
        </pre>
      </section>

      {/* --- Form Success Message --- */}
      <section>
        <h2 className="text-2xl mb-4">form-success-message</h2>
        <div className="padding">
          <FormSuccessMessage />
        </div>
        <pre className="p-2 font-mono text-sm">{`{}`}</pre>
      </section>

      {/* --- Form Text Input --- */}
      <section>
        <h2 className="text-2xl mb-4">form-text-input</h2>
        <FormTextInput
          label="Email address"
          name="email-address"
          placeholder="you@yourname.com"
          type="email"
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "label": "Email address",
  "name": "email-address",
  "placeholder": "you@yourname.com",
  "type": "email"
}`}
        </pre>
      </section>

      {/* --- Form Title --- */}
      <section>
        <h2 className="text-2xl mb-4">form-title</h2>
        <FormTitle legend="Event Inquiry Form" />
        <pre className="p-2 font-mono text-sm">{`{ "legend": "Event Inquiry Form" }`}</pre>
      </section>

      {/* --- Form Toggle Input --- */}
      <section>
        <h2 className="text-2xl mb-4">form-toggle-input</h2>
        <FormToggleInput name="toggle" label={longLabel} />
        <pre className="p-2 font-mono text-sm">
{`{
  "label": "${longLabel.replace(/\n/g, ' ')}",
  "name": "toggle",
  "type": "checkbox"
}`}
        </pre>
      </section>

      {/* --- Form Toggle Input Group --- */}
      <section>
        <h2 className="text-2xl mb-4">form-toggle-input-group</h2>
        <FormToggleInputGroup
          legend="Do you like Olive Oil?"
          name="toggle"
          options={oliveOptions}
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "legend": "Do you like Olive Oil?",
  "name": "toggle",
  "options": ${JSON.stringify(oliveOptions)},
  "type": "radio"
}`}
        </pre>
      </section>

      {/* --- Home Hero --- */}
      <section>
        <h2 className="text-2xl mb-4">home-hero</h2>
        <div className="padding">
          <HomeHero />
        </div>
        <pre className="p-2 font-mono text-sm">{`{}`}</pre>
      </section>

      {/* --- IconButton Demo --- */}
      <section>
        <h2 className="text-2xl mb-4">icon-button</h2>
        <IconButton
          iconName="star"
          aria-label="star"
          badge={2}
          iconClassName="size:24px"
        />
      </section>

      {/* --- Product --- */}
      <section>
        <h2 className="text-2xl mb-4">product</h2>
        <div className="padding">
          <Product slug="rex-microcontrollers-tshirt" />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "slug": "rex-microcontrollers-tshirt"
}`}
        </pre>
      </section>

      {/* --- Promo Code --- */}
      <section>
        <h2 className="text-2xl mb-4">promo-code</h2>
        <div className="padding">
          <PromoCode
            content="10DISCOUNT"
            removable
            onRemove={() => console.log('Remove clicked')}
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "content": "10DISCOUNT",
  "removable": true
}`}
        </pre>
      </section>

      {/* --- Quantity Changer --- */}
      <section>
        <h2 className="text-2xl mb-4">quantity-changer</h2>
        <div className="padding">
          <QuantityChanger
            name="foo"
            value={1}
            onChange={(v) => console.log('New quantity', v)}
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "foo"
}`}
        </pre>
      </section>

      {/* --- Shop Hero --- */}
      <section>
        <h2 className="text-2xl mb-4">shop-hero</h2>
        <div className="padding">
          <ShopHero />
        </div>
        <pre className="p-2 font-mono text-sm">{`{}`}</pre>
      </section>

      {/* --- Size Picker Pattern --- */}
      <section>
        <h2 className="text-2xl mb-4">size-picker</h2>
        <SizePickerPattern
          name="foo"
          sizes={['S','M','L','XL','XXL']}
          selectedSize={selectedSize}
          onChange={setSelectedSize}
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "foo",
  "sizes": ["S","M","L","XL","XXL"],
  "selectedSize": "${selectedSize}"
}`}
        </pre>
      </section>

      {/* --- Social Icon --- */}
      <section>
        <h2 className="text-2xl mb-4">social-icon</h2>
        <div className="padding">
          <SocialIcon name="facebook" url="#" />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "facebook",
  "url": "#"
}`}
        </pre>
      </section>

      {/* --- Swatches --- */}
      <section>
        <h2 className="text-2xl mb-4">swatches</h2>
        <Swatches />
        <pre className="p-2 font-mono text-sm">{`{}`}</pre>
      </section>

      {/* --- SVG --- */}
      <section>
        <h2 className="text-2xl mb-4">svg</h2>
        <div className="padding">
          <Svg
            name="bust"
            className="display:inline-block pointer-events-none svg-fill-color:current svg-fill-rule:even-odd vertical-align:bottom size:24px"
          />
        </div>
        <pre className="p-2 font-mono text-sm">
{`{
  "name": "bust"
}`}
        </pre>
      </section>

      {/* --- Merchandise Banner --- */}
      <section>
        <h2 className="text-2xl mb-4">merchandise-banner</h2>
        <MerchandiseBanner
          heading="Merchandise"
          content="Share your love of technology, and spread good cheer, with Binaryville official merchandise, including t-shirts, hats, mugs, aprons, posters, stickers, and more."
          button={{ href: '/shop/', label: 'Visit Shop' }}
          color="yellow"
        />
        <pre className="p-2 font-mono text-sm">
{`{
  "button": { "href": "/shop/", "label": "Visit Shop" },
  "color": "yellow",
  "content": "Share your love of technology, and spread good cheer, with Binaryville official merchandise, including t-shirts, hats, mugs, aprons, posters, stickers, and more.",
  "heading": "Merchandise"
}`}
        </pre>
      </section>
    </div>
  )
}

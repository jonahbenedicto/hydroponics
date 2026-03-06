import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function App() {
  const apiBase = 'http://127.0.0.1:8000'

  const [items, setItems] = useState<unknown[]>([])
  const [itemId, setItemId] = useState('')
  const [singleItem, setSingleItem] = useState<unknown | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [createdItem, setCreatedItem] = useState<unknown | null>(null)

  const [number1, setNumber1] = useState('0')
  const [number2, setNumber2] = useState('0')
  const [sumResult, setSumResult] = useState<number | null>(null)

  const [error, setError] = useState('')

  async function getItems() {
    setError('')
    const response = await fetch(`${apiBase}/items/`)

    if (!response.ok) {
      setError(`GET /items failed: ${response.status}`)
      return
    }

    const data = await response.json()
    setItems(data)
  }

  async function getItem() {
    setError('')

    if (!itemId) {
      setError('Enter an item id')
      return
    }

    const response = await fetch(`${apiBase}/items/${itemId}`)

    if (!response.ok) {
      setError(`GET /items/${itemId} failed: ${response.status}`)
      return
    }

    const data = await response.json()
    setSingleItem(data)
  }

  async function addItem() {
    setError('')

    if (!name.trim() || !description.trim()) {
      setError('Name and description are required')
      return
    }

    const response = await fetch(`${apiBase}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })

    if (!response.ok) {
      setError(`POST /items failed: ${response.status}`)
      return
    }

    const data = await response.json()
    setCreatedItem(data)
  }

  async function addNumbers() {
    setError('')

    const response = await fetch(
      `${apiBase}/add/?number_1=${encodeURIComponent(number1)}&number_2=${encodeURIComponent(number2)}`,
    )

    if (!response.ok) {
      setError(`GET /add failed: ${response.status}`)
      return
    }

    const data: { result: number } = await response.json()
    setSumResult(data.result)
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Hydroponics API Client</h1>

      <Card>
        <CardHeader>
          <CardTitle>Get all items</CardTitle>
          <CardDescription>Calls GET /items/</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={getItems}>GET /items/</Button>
          <pre className="overflow-x-auto rounded-md border p-3 text-xs">{JSON.stringify(items, null, 2)}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get one item</CardTitle>
          <CardDescription>Calls GET /items/{'{item_id}'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="item-id">Item ID</Label>
            <Input
              id="item-id"
              type="number"
              placeholder="item id"
              value={itemId}
              onChange={(event) => setItemId(event.target.value)}
            />
          </div>
          <Button onClick={getItem}>GET /items/{'{item_id}'}</Button>
          <pre className="overflow-x-auto rounded-md border p-3 text-xs">{JSON.stringify(singleItem, null, 2)}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add an item</CardTitle>
          <CardDescription>Calls POST /items/</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="item-name">Name</Label>
            <Input
              id="item-name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              id="item-description"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <Button onClick={addItem}>POST /items/</Button>
          <pre className="overflow-x-auto rounded-md border p-3 text-xs">{JSON.stringify(createdItem, null, 2)}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add two numbers</CardTitle>
          <CardDescription>Calls GET /add/ with number_1 and number_2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="number-1">Number 1</Label>
              <Input
                id="number-1"
                type="number"
                value={number1}
                onChange={(event) => setNumber1(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number-2">Number 2</Label>
              <Input
                id="number-2"
                type="number"
                value={number2}
                onChange={(event) => setNumber2(event.target.value)}
              />
            </div>
          </div>
          <Button onClick={addNumbers}>GET /add/</Button>
          <p>Result: {sumResult ?? '-'}</p>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">Error: {error}</p>}
    </main>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const DEFAULT_TOKEN = 'H2rJLTfqZW2wna5NU8NzGQtt-134320309005369-4v5saRNGJuyPG1xaSbqX'

type StoryblokStory = {
  name: string
  slug: string
  full_slug: string
}

export default function StoryblokTestPage() {
  const [token, setToken] = useState(DEFAULT_TOKEN)
  const [stories, setStories] = useState<StoryblokStory[]>([])
  const [slug, setSlug] = useState('')
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadStories() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${encodeURIComponent(token)}&version=draft&per_page=20&cv=${Date.now()}`
      )
      if (!response.ok) throw new Error('Storyblok request failed')
      const data = await response.json()
      setStories(data.stories ?? [])
    } catch (err) {
      setError('Storyblok konnte nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }

  async function loadStory() {
    if (!slug.trim()) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${encodeURIComponent(token)}&version=draft&cv=${Date.now()}`
      )
      if (!response.ok) throw new Error('Storyblok request failed')
      const data = await response.json()
      setStory(data.story)
    } catch (err) {
      setError('Story konnte nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStories()
  }, [])

  return (
    <section className="page setup-page">
      <div className="setup-shell">
        <Header title="Storyblok Test" subtitle="Stories laden und Inhalte prüfen." subtitleColor="#65748b" />

        <div className="setup-grid">
          <Card className="setup-card">
            <h3>API Token</h3>
            <label className="form-field">
              Storyblok Preview Token
              <input
                className="text-input"
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button onClick={loadStories} disabled={loading}>
                Stories laden
              </Button>
              <Button variant="secondary" onClick={() => window.open('https://app.storyblok.com', '_blank', 'noreferrer')}>
                Storyblok öffnen
              </Button>
            </div>
          </Card>

          <Card className="setup-card">
            <h3>Stories</h3>
            {loading && <p>Loading…</p>}
            {error && <p className="error-text">{error}</p>}
            <ul>
              {stories.map((item) => (
                <li key={item.full_slug}>
                  <strong>{item.name}</strong> – {item.full_slug}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Story laden</h3>
            <label className="form-field">
              Story-Slug
              <input className="text-input" value={slug} onChange={(event) => setSlug(event.target.value)} />
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button onClick={loadStory} disabled={loading || !slug.trim()}>
                Story laden
              </Button>
            </div>
            {story && (
              <>
                <h4 style={{ marginTop: '1rem' }}>Story (JSON)</h4>
                <pre className="code-block">{JSON.stringify(story, null, 2)}</pre>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

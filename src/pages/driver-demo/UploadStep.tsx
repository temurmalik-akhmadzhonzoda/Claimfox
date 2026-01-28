import React from 'react'
import Card from '@/components/ui/Card'

type UploadState = {
  photos: boolean
  report: boolean
  license: boolean
}

type UploadStepProps = {
  uploads: UploadState
  onUploadChange: (updates: Partial<UploadState>) => void
  lastUpload: string | null
}

export default function UploadStep({
  uploads,
  onUploadChange,
  lastUpload
}: UploadStepProps) {
  return (
    <>
      <Card title="Evidence upload" subtitle="Tap a tile to simulate upload." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div
            className={`upload-tile ${uploads.photos ? 'upload-tile--done' : ''}`}
            onClick={() => onUploadChange({ photos: true })}
            role="button"
            tabIndex={0}
          >
            <strong>Photos of damage</strong>
            <div className="upload-tile__thumbs">
              {[0, 1, 2].map((index) => (
                <div key={index} className="upload-tile__thumb" />
              ))}
            </div>
            <span className="demo-progress">{uploads.photos ? 'Uploaded (demo)' : 'Add photos'}</span>
          </div>

          <div
            className={`upload-tile ${uploads.report ? 'upload-tile--done' : ''}`}
            onClick={() => onUploadChange({ report: true })}
            role="button"
            tabIndex={0}
          >
            <strong>Police report</strong>
            <span className="demo-progress">{uploads.report ? 'Uploaded (demo)' : 'Optional'}</span>
          </div>

          <div
            className={`upload-tile ${uploads.license ? 'upload-tile--done' : ''}`}
            onClick={() => onUploadChange({ license: true })}
            role="button"
            tabIndex={0}
          >
            <strong>Driver license</strong>
            <span className="demo-progress">{uploads.license ? 'Uploaded (demo)' : 'Optional'}</span>
          </div>
        </div>
      </Card>

      {lastUpload && (
        <Card variant="glass" className="demo-card">
          <strong>Upload simulated: {lastUpload}</strong>
        </Card>
      )}

      <Card variant="glass" className="demo-card">
        <span className="demo-progress">Uploads are encrypted and added to your claim file (demo).</span>
      </Card>
    </>
  )
}

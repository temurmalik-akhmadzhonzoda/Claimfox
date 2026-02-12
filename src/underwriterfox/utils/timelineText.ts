import type { TimelineEvent } from '@/underwriterfox/types'
type Translator = (path: string, vars?: Record<string, string | number | undefined>) => string

const TITLE_KEY_MAP: Record<string, string> = {
  'Case created': 'underwriterfox.timeline.systemTitles.caseCreated',
  'Document uploaded': 'underwriterfox.timeline.systemTitles.documentUploaded',
  'Rules evaluated': 'underwriterfox.timeline.systemTitles.rulesEvaluated',
  'Rating recalculated': 'underwriterfox.timeline.systemTitles.ratingRecalculated',
  'AI recommendation generated': 'underwriterfox.timeline.systemTitles.aiGenerated',
  'Case status updated': 'underwriterfox.timeline.systemTitles.statusUpdated',
  'Rules evaluation saved': 'underwriterfox.timeline.systemTitles.rulesSaved',
  'Rating snapshot saved': 'underwriterfox.timeline.systemTitles.ratingSaved',
  'Audit export generated': 'underwriterfox.timeline.systemTitles.auditExported'
}

export function translateTimelineTitle(event: TimelineEvent, t: Translator): string {
  const key = TITLE_KEY_MAP[event.title]
  return key ? t(key) : event.title
}

const INTAKE_RE = /^Intake started for (.+)\.$/
const DOC_RE = /^(.+) ingested and extracted\.$/
const RULES_RE = /^Rules engine executed: (\d+) findings\.$/
const RATING_RE = /^Rating snapshot ([^ ]+) saved with technical premium €(\d+)\.$/
const AI_RE = /^Recommendation: ([^.]+)\. Confidence ([0-9.]+)\.$/
const REVIEW_RE = /^Reviewed (.+) risk factors and broker submission\.$/
const MOVED_RE = /^Moved to ([^ ]+) queue for follow-up\.$/

export function translateTimelineMessage(event: TimelineEvent, t: Translator): string {
  const intake = event.message.match(INTAKE_RE)
  if (intake) return t('underwriterfox.timeline.systemMessages.intakeStarted', { caseNumber: intake[1] })

  const doc = event.message.match(DOC_RE)
  if (doc) return t('underwriterfox.timeline.systemMessages.documentIngested', { documentName: doc[1] })

  const rules = event.message.match(RULES_RE)
  if (rules) return t('underwriterfox.timeline.systemMessages.rulesFindings', { findings: rules[1] })

  const rating = event.message.match(RATING_RE)
  if (rating) return t('underwriterfox.timeline.systemMessages.ratingSaved', { version: rating[1], premium: rating[2] })

  const ai = event.message.match(AI_RE)
  if (ai) return t('underwriterfox.timeline.systemMessages.aiRecommendation', { decision: ai[1], confidence: ai[2] })

  const review = event.message.match(REVIEW_RE)
  if (review) return t('underwriterfox.timeline.systemMessages.reviewedFactors', { productLine: review[1] })

  const moved = event.message.match(MOVED_RE)
  if (moved) return t('underwriterfox.timeline.systemMessages.movedQueue', { status: moved[1] })

  return event.message
}

import { ArrowUpRight } from 'lucide-react';
import { focusHref } from '../data/focus';

export default function FocusIntro() {
  return <section className="shell pb-16 sm:pb-20" aria-labelledby="focus-intro-title">
    <div className="border-t border-rule pt-7">
      <a href={focusHref} className="inline-flex items-center">
        <h2 id="focus-intro-title" className="font-display text-[38px] leading-tight">Focus</h2>
      </a>
      <a href={focusHref} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[14px] underline decoration-rule underline-offset-[6px] hover:decoration-ink">Open Focus <ArrowUpRight size={14} aria-hidden="true" /></a>
    </div>
  </section>;
}

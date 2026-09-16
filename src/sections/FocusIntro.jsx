import { ArrowUpRight } from 'lucide-react';
import { focusHref } from '../data/focus';

export default function FocusIntro() {
  return <section className="shell pb-16 sm:pb-20" aria-labelledby="focus-intro-title">
    <div className="border-t border-rule pt-7">
      <a href={focusHref} className="group inline-flex items-center gap-3">
        <h2 id="focus-intro-title" className="font-display text-[38px] leading-tight">Focus</h2>
        <ArrowUpRight size={19} className="text-ink70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
      <p className="mt-3 text-[15px] leading-7 text-ink70">A little space I built to help myself focus. A Pomodoro timer, a place for my focus music, and a little surprise.</p>
      <a href={focusHref} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[14px] underline decoration-rule underline-offset-[6px] hover:decoration-ink">Open Focus <ArrowUpRight size={14} aria-hidden="true" /></a>
    </div>
  </section>;
}

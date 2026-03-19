import Link from '@/components/Link'

export default function CommentPolicy() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-start md:justify-center md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-5xl md:leading-14 dark:text-gray-100">
          Comment Policy
        </h1>
      </div>
      <div className="max-w-xl">
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">
          Thank you for reading my blog!
        </p>
        <p className="mb-6">
          I welcome your thoughts and reactions, but ask that all comments stay respectful and
          on-topic. By commenting, you agree to the following guidelines:
        </p>
        <ul className="mb-8 list-disc space-y-3 pl-5 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Be respectful:</strong> Hate speech, harassment, bullying, or defamatory
            comments will not be tolerated and will be removed.
          </li>
          <li>
            <strong>No spam or self-promotion:</strong> Do not post the same comment multiple times
            or use comments for advertising products, services, or unrelated links.
          </li>
          <li>
            <strong>Privacy matters:</strong> For your safety, please do not share personal
            information such as phone numbers, addresses, or credit card numbers.
          </li>
          <li>
            <strong>Moderation policy:</strong> Comments containing excessive links or “banned
            words” may be automatically flagged for review. I reserve the right to remove any
            comment or ban users who violate these rules.
          </li>
          <li>
            <strong>Images and video:</strong> Explicit or graphic media is strictly forbidden and
            will be removed.
          </li>
        </ul>
        <p className="mb-8">
          I appreciate you taking the time to comment and help keep this space welcoming and
          constructive for everyone.
        </p>
        <Link
          href="https://scuba.glcodeworks.com/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:outline-hidden dark:hover:bg-blue-500"
        >
          Back to blogs
        </Link>
      </div>
    </div>
  )
}

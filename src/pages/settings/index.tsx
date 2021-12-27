import { FC, useState } from 'react'

const SettingsPage: FC = () => {

  return (
    <main className="flex-1 flex overflow-hidden h-screen">
      {/* Primary column */}
      <section
        aria-labelledby="primary-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
      >
        <h1 id="primary-heading" className="sr-only">
          Settings
        </h1>
        {/* Your content */}
        Settings
      </section>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-white overflow-y-auto">
          {/* Your content */}
        </div>
      </aside>
    </main>
  )
}

export default SettingsPage;
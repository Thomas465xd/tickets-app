export default function Header() {
	return (
		<header className="">
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-16">
					<div className="hidden sm:mb-8 sm:flex sm:justify-center">
						<div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
							Announcing our next round of funding.{" "}
							<a
								href="#"
								className="font-semibold text-amber-400"
							>
								<span
									aria-hidden="true"
									className="absolute inset-0"
								/>
								Read more <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
					<div className="text-center">
						<h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
							Find Tickets to your favorite Artists
						</h1>
						<p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
							Anim aute id magna aliqua ad ad non deserunt sunt.
							Qui irure qui lorem cupidatat commodo. Elit sunt
							amet fugiat veniam occaecat.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="#"
								className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
							>
								Browse Tickets
							</a>
							<a
								href="#"
								className="text-sm/6 font-semibold text-white"
							>
								Learn more <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>
		</header>
	);
}

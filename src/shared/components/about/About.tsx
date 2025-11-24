import { Button } from '../ui/button';

export default function About() {
	return (
		<div className='flex flex-col gap-10'>
			<div>
				<p className='h2-l'>
					Hi there! I’m <span> Finnegan Manroe</span>, a passionate photographer based in the
					vibrant city of <span>Seattle</span>. With over a decade of experience behind the lens, I
					specialize in capturing <span>the unique beauty of life’s fleeting moments</span>, from
					intimate portraits and breathtaking landscapes to dynamic product shots and lively events.
				</p>
			</div>
			<div>
				<div>
					<img src='assets/about/about/img-1.avif' alt='' />
					<img src='assets/about/about/img-2.avif' alt='' />
					<img src='assets/about/about/img-3.avif' alt='' />
				</div>
				<div>
					<p>
						My journey into photography began as a curious child with a disposable camera,
						fascinated by the world’s colors and light. Over the years, this hobby transformed into
						a full-blown love affair with visual storytelling. Each click of the shutter is my way
						of freezing time, preserving emotions, and narrating stories that words alone can’t
						convey.
					</p>

					<p>
						I’ve had the privilege of working with amazing clients and have been honored with
						several awards for my work.
					</p>
					<p>
						Let’s create something extraordinary together. Whether you’re looking to capture a
						special moment, need stunning visuals for your brand, or simply want to explore the
						world through my lens, I’d love to hear from you!
					</p>
					<p>Feel free to reach out, and let’s make magic happen.</p>
					<Button variant={'outline'} label={'get template'} />
				</div>
			</div>
		</div>
	);
}

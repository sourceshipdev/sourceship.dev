import Marquee from 'react-fast-marquee'
import exampleLogo from '@/public/logo/example.png'

const logos = [
  {
    name: 'Example 1',
    url: exampleLogo.src,
  },
  {
    name: 'Example 2',
    url: exampleLogo.src,
  },
  {
    name: 'Example 3',
    url: exampleLogo.src,
  },
  {
    name: 'Example 4',
    url: exampleLogo.src,
  },
  {
    name: 'Example 5',
    url: exampleLogo.src,
  },
  {
    name: 'Example 6',
    url: exampleLogo.src,
  },
  {
    name: 'Example 7',
    url: exampleLogo.src,
  },
  {
    name: 'Example 8',
    url: exampleLogo.src,
  },
  {
    name: 'Example 9',
    url: exampleLogo.src,
  },
]

export default function AnimatedLogoCloud() {
  return (
    <div className="w-full py-12">
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Building a startup? Platform your open source technology today
          </h2>
        </div>
        <div 
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        >
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            direction="right"
            className="w-full"
          >
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.url}
                className="h-10 w-28 mx-8 brightness-0 dark:invert"
                alt={`${logo.name}`}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
} 
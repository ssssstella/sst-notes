import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  return (
    <header className='w-full h-20 flex items-center justify-between'>
      <Logo />
      <Nav />
    </header>
  )
}

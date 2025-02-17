import logo from '../../public/scratch-icon.png';

function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <img src={logo} alt="logo" className="size-10 rounded-full" />
      <h3 className='text-xl font-bold'>Scratch</h3>
    </div>
  );
}

export default Logo;

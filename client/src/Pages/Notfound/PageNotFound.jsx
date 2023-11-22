import { Link } from 'react-router-dom';
import NotFound from '../../assets/404.gif';

const PageNotFound = () => {
  return (
    <div className='mt-[-15vh] lg:mt-[-20vh] mb-[4vh] flex flex-col items-center justify-center ' >
      <img src={NotFound} alt='page not found' className='pt-[17vh] w-[50%] lg:w-[30%] ' loading='lazy'/>
      <div>
        <h2 className='text-center sm:text-4xl  font-mono font-extrabold'>Oops! Seems Something happen</h2>
        <h2 className='text-center text-[13px] sm:text-[2vh] lg:text-[3vh]' >We'd typically show you a page, but it seems something went <br/> wrong, <span className='font-semibold'>the page you are looking for does not exist.</span></h2>

        <div className='text-center'>
        <Link to='/'><button className='bg-[#0F172A] text-white font-[Poppins] py-2 px-6 rounded md:ml-8 duration-500 mt-3 '> Back to Home</button></Link>
        </div>
        
      </div>
    </div>
  )
}

export default PageNotFound;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'


const colorClasses = {
  indigo: {
    bgLight: 'bg-indigo-500/5',
    borderLight: 'border-indigo-500/20',
    borderHover: 'group-hover:border-indigo-500/40',
    iconBg: 'bg-indigo-900/60 group-hover:bg-indigo-800/70',
    text: 'text-indigo-300 group-hover:text-indigo-200',
    link: 'text-indigo-400 hover:text-indigo-300',
    icon: 'text-indigo-500',
  },
  red: {
    bgLight: 'bg-red-500/5',
    borderLight: 'border-red-500/20',
    borderHover: 'group-hover:border-red-500/40',
    iconBg: 'bg-red-900/60 group-hover:bg-red-800/70',
    text: 'text-red-300 group-hover:text-red-200',
    link: 'text-red-400 hover:text-red-300',
    icon: 'text-red-500',
  },

  cyan: {
    bgLight: 'bg-cyan-500/5',
    borderLight: 'border-cyan-500/20',
    borderHover: 'group-hover:border-cyan-500/40',
    iconBg: 'bg-cyan-900/60 group-hover:bg-cyan-800/70',
    text: 'text-cyan-300 group-hover:text-cyan-200',
    link: 'text-cyan-400 hover:text-cyan-300',
    icon: 'text-cyan-500',
  },
  
  purple : {
    bgLight: 'bg-purple-500/5',
    borderLight: 'border-purple-500/20',
    borderHover: 'group-hover:border-purple-500/40',
    iconBg: 'bg-purple-900/60 group-hover:bg-purple-800/70',
    text: 'text-purple-300 group-hover:text-purple-200',
    link: 'text-purple-400 hover:text-purple-300',
    icon: 'text-purple-500',
},

  blue : {
      bgLight: 'bg-blue-500/5',
      borderLight: 'border-blue-500/20',
      borderHover: 'group-hover:border-blue-500/40',
      iconBg: 'bg-blue-900/60 group-hover:bg-blue-800/70',
      text: 'text-blue-300 group-hover:text-blue-200',
      link: 'text-blue-400 hover:text-blue-300',
      icon: 'text-blue-500',
  },
};

const icons = {
    "faCoffee" : faCoffee,
    "faCode" : faCode,
    "faClock" : faClock,
};

function Box({ title, desc, color = 'indigo', icon = "faCoffee", link = null }) {
  const c = colorClasses[color] || colorClasses['indigo'];
  const resolvedIcon = icons[icon] || faCoffee;

  return (
    <div className="relative group h-full">
      <div className={`absolute inset-0 ${c.bgLight} rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
      <div className={`border-2 bg-gradient-to-br from-gray-900 ${c.borderLight} rounded-lg p-4 sm:p-6 relative z-10 h-full ${c.borderHover} transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_-24px_rgba(59,130,246,0.8)]`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3 sm:mb-4">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded ${c.iconBg} flex items-center justify-center mr-3 transition-colors`}>
                <FontAwesomeIcon icon={resolvedIcon} className={c.icon}/>
            </div>
            <div className={`font-medium text-base sm:text-lg ${c.text} transition-colors`}>{title}</div>
          </div>
          <p className="text-start text-sm sm:text-base text-gray-400 mb-4">{desc}</p>
          { link ? <a href={link} target="_blank" rel="noreferrer" className={`mt-auto ${c.link} inline-flex items-center text-sm sm:text-base`}>
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a> : null }
          
        </div>
      </div>
    </div>
  );
}


export default Box;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'


const colorClasses = {
  indigo: {
    bgLight: 'bg-indigo-500/10',
    borderLight: 'border-white/5',
    borderHover: 'group-hover:border-indigo-500/30',
    iconBg: 'bg-indigo-500/20',
    text: 'text-white',
    link: 'text-indigo-400',
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
      bgLight: 'bg-blue-500/10',
      borderLight: 'border-white/5',
      borderHover: 'group-hover:border-blue-500/30',
      iconBg: 'bg-blue-500/20',
      text: 'text-white',
      link: 'text-blue-400',
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
    <div className="relative group h-full select-none">
      <div className={`absolute inset-0 ${c.bgLight} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`border bg-white/[0.02] ${c.borderLight} rounded-2xl p-6 relative z-10 h-full ${c.borderHover} transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center mr-4 transition-colors`}>
                <FontAwesomeIcon icon={resolvedIcon} className={c.icon}/>
            </div>
            <div className={`font-bold text-xl ${c.text} transition-colors`}>{title}</div>
          </div>
          <p className="text-start text-sm text-slate-400 leading-relaxed">{desc}</p>
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

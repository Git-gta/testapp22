'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Trash2, Edit, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

export default function ProductivityApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const
  })

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTask.title) {
      toast.error('Please enter a task title')
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    }

    const updatedTasks = [task, ...tasks]
    saveTasks(updatedTasks)
    
    setNewTask({ title: '', description: '', priority: 'medium' })
    setShowAddForm(false)
    toast.success('Task added!')
  }

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    saveTasks(updatedTasks)
  }

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    saveTasks(updatedTasks)
    toast.success('Task deleted')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: '#4F5D95' }}>
              TestApp22
            </h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#4F5D95' }}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Add Task Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6 mb-6"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
                  style={{ '--tw-ring-color': '#4F5D95' } as any}
                />
              </div>
              <div>
                <textarea
                  placeholder="Description (optional)..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: '#4F5D95' }}
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'completed'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === filterOption 
                  ? 'text-white' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
              style={filter === filterOption ? { backgroundColor: '#4F5D95' } : {}}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-2xl font-bold">{tasks.length}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-2xl font-bold text-orange-600">{tasks.filter(t => !t.completed).length}</div>
            <div className="text-gray-600">Pending</div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Check className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No tasks yet' : 
                 filter === 'completed' ? 'No completed tasks' : 'No pending tasks'}
              </h3>
              <p className="text-gray-500">
                {filter === 'all' && 'Create your first task to get started.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg shadow-sm border p-4 flex items-center gap-4 ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className="text-xs px-2 py-1 rounded-full text-white capitalize"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
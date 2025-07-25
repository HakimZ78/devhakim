'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Calendar,
  Tag,
  BookOpen,
  Zap,
  AlertCircle
} from 'lucide-react';
interface Command {
  id: string;
  title: string;
  description: string;
  command: string;
  category: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  example?: string;
  output?: string;
  dateLearned?: string;
  relatedTo?: string;
  sourceFile?: string;
  projectSource?: string;
  tags?: string[];
}

type CommandCategory = string;

const columnHelper = createColumnHelper<Command>();

const categoryIcons = {
  git: '📋',
  npm: '📦',
  python: '🐍',
  docker: '🐳',
  nginx: '🌐',
  database: '🗄️',
  ssh: '🔐',
  system: '⚙️',
  wine: '🍷',
  pm2: '📦',
  network: '🌐',
  systemd: '🔧',
  deployment: '🚀',
  vnc: '🖥️',
  monitoring: '📊',
  security: '🛡️'
};

const difficultyColors = {
  beginner: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  intermediate: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  advanced: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
};

export default function CommandsReference() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [progressionFilter, setProgressionFilter] = useState<string>('all');
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [newCommand, setNewCommand] = useState<Partial<Command>>({});

  // Load commands from database on mount
  useEffect(() => {
    loadCommands();
  }, []);

  const loadCommands = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/commands');
      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform the database format to match the component's expected format
        const transformedCommands = result.data.map((cmd: any) => ({
          id: cmd.id,
          title: cmd.title,
          description: cmd.description,
          command: cmd.command,
          category: cmd.category,
          projectSource: cmd.project_source,
          tags: cmd.tags || [],
          difficulty: cmd.difficulty || 'intermediate', // Use actual difficulty from database
          complexity: cmd.difficulty === 'beginner' ? 1 : cmd.difficulty === 'advanced' ? 5 : 3
        }));
        setCommands(transformedCommands);
      } else {
        console.error('Failed to load commands:', result);
      }
    } catch (error) {
      console.error('Error loading commands:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter commands based on selected filters
  const filteredCommands = useMemo(() => {
    let filtered = commands;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(cmd => cmd.category === categoryFilter);
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(cmd => cmd.difficulty === difficultyFilter);
    }

    if (progressionFilter !== 'all') {
      filtered = filtered.filter(cmd => cmd.projectSource === progressionFilter);
    }

    return filtered;
  }, [commands, categoryFilter, difficultyFilter, progressionFilter]);

  const columns = [
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ getValue }) => {
        const category = getValue();
        return (
          <div className="flex items-center space-x-2">
            <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
            <span className="capitalize text-gray-300 text-sm">{category}</span>
          </div>
        );
      },
      filterFn: 'includesString',
      size: 120,
    }),
    columnHelper.accessor('command', {
      header: 'Command',
      cell: ({ getValue, row }) => {
        const command = getValue();
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <code className="bg-slate-700/50 text-blue-300 px-2 py-1 rounded text-sm font-mono border border-slate-600/50">
                {command}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(command)}
                className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                title="Copy command"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              {row.original.description}
            </p>
          </div>
        );
      },
      size: 400,
    }),
    columnHelper.accessor('example', {
      header: 'Example',
      cell: ({ getValue, row }) => {
        const example = getValue();
        return (
          <div className="space-y-1">
            <code className="bg-slate-800/50 text-gray-300 px-2 py-1 rounded text-xs font-mono block border border-slate-600/30">
              {example}
            </code>
            {row.original.output && (
              <div className="text-xs text-gray-500 mt-1">
                <span className="text-green-400">Output:</span> {row.original.output}
              </div>
            )}
          </div>
        );
      },
      size: 300,
    }),
    columnHelper.accessor('difficulty', {
      header: 'Level',
      cell: ({ getValue }) => {
        const difficulty = getValue() || 'beginner';
        const colors = difficultyColors[difficulty];
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
            {difficulty}
          </span>
        );
      },
      size: 100,
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: ({ getValue }) => {
        const tags = getValue() || [];
        return (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-600/50 text-gray-400 rounded text-xs border border-slate-500/50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">+{tags.length - 3}</span>
            )}
          </div>
        );
      },
      enableSorting: false,
      size: 200,
    }),
    columnHelper.accessor('projectSource', {
      header: 'Source',
      cell: ({ getValue }) => {
        const source = getValue();
        return (
          <span className="text-xs text-gray-400 font-medium">
            {source}
          </span>
        );
      },
      size: 120,
    }),
    columnHelper.accessor('dateLearned', {
      header: 'Date',
      cell: ({ getValue }) => {
        const date = getValue();
        if (!date) return <span className="text-xs text-gray-500">-</span>;
        
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) return <span className="text-xs text-gray-500">-</span>;
        
        return (
          <span className="text-xs text-gray-500">
            {dateObj.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
        );
      },
      size: 100,
    }),
  ];

  const table = useReactTable({
    data: filteredCommands,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 20,
      },
      sorting: [
        {
          id: 'dateLearned',
          desc: true,
        },
      ],
    },
  });

  const handleAddCommand = () => {
    if (!newCommand.command || !newCommand.description) return;

    const command: Command = {
      id: `custom-${Date.now()}`,
      title: newCommand.title || newCommand.command,
      category: (newCommand.category as CommandCategory) || 'system',
      command: newCommand.command,
      description: newCommand.description,
      example: newCommand.example || newCommand.command,
      dateLearned: newCommand.dateLearned || new Date().toISOString(),
      difficulty: newCommand.difficulty || 'beginner',
      tags: newCommand.tags || [],
      relatedTo: newCommand.relatedTo,
      projectSource: newCommand.projectSource || 'Custom',
      sourceFile: newCommand.sourceFile,
    };

    setCommands(prev => [...prev, command]);
    setNewCommand({});
    setIsAddingCommand(false);
  };

  const handleEditCommand = (command: Command) => {
    setEditingCommand({ ...command });
  };

  const handleSaveEdit = () => {
    if (!editingCommand) return;

    setCommands(prev => 
      prev.map(cmd => 
        cmd.id === editingCommand.id ? editingCommand : cmd
      )
    );
    setEditingCommand(null);
  };

  const handleDeleteCommand = (id: string) => {
    if (window.confirm('Are you sure you want to delete this command?')) {
      setCommands(prev => prev.filter(cmd => cmd.id !== id));
    }
  };

  const exportCommands = (format: 'json' | 'csv') => {
    const dataToExport = filteredCommands;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'commands.json';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const headers = ['Category', 'Command', 'Description', 'Example', 'Difficulty', 'Tags', 'Source', 'Date'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(cmd => [
          cmd.category,
          `"${cmd.command}"`,
          `"${cmd.description}"`,
          `"${cmd.example || ''}"`,
          cmd.difficulty || 'beginner',
          `"${(cmd.tags || []).join('; ')}"`,
          cmd.projectSource || '',
          cmd.dateLearned ? (new Date(cmd.dateLearned).toISOString().split('T')[0]) : ''
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'commands.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const stats = {
    total: commands.length,
    beginner: commands.filter(cmd => cmd.difficulty === 'beginner').length,
    intermediate: commands.filter(cmd => cmd.difficulty === 'intermediate').length,
    advanced: commands.filter(cmd => cmd.difficulty === 'advanced').length,
    categories: [...new Set(commands.map(cmd => cmd.category))].length,
  };

  if (loading) {
    return (
      <section className="py-20 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading commands...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">Commands Reference</h1>
          </div>
          <p className="text-xl text-gray-400 mb-8">
            A comprehensive database of technical commands learned during my journey
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Commands</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{stats.beginner}</div>
              <div className="text-sm text-gray-400">Beginner</div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{stats.intermediate}</div>
              <div className="text-sm text-gray-400">Intermediate</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{stats.advanced}</div>
              <div className="text-sm text-gray-400">Advanced</div>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{stats.categories}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search commands, descriptions, tags..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <div className="relative group">
                <button className="flex items-center px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors duration-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <div className="absolute top-full right-0 mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => exportCommands('json')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-600 transition-colors duration-200"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={() => exportCommands('csv')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-600 transition-colors duration-200"
                  >
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {Object.keys(categoryIcons).map(category => (
                <option key={category} value={category}>
                  {categoryIcons[category as keyof typeof categoryIcons]} {category}
                </option>
              ))}
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={progressionFilter}
              onChange={(e) => setProgressionFilter(e.target.value)}
              className="px-4 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Project Sources</option>
              {[...new Set(commands.map(cmd => cmd.projectSource))].filter(Boolean).map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredCommands.length} of {commands.length} commands
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-600/50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-4 text-left text-sm font-semibold text-gray-300 border-b border-slate-600/50"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center space-x-2 ${
                              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {header.column.getIsSorted() && (
                              <span className="text-blue-400">
                                {header.column.getIsSorted() === 'desc' ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronUp className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-600/50">
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id}
                    className="hover:bg-slate-600/30 transition-colors duration-200"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 text-sm"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-600/30 border-t border-slate-600/50">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <span className="text-sm text-gray-400">
                ({table.getFilteredRowModel().rows.length} total results)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Learning Progression Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Learning Progression</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...new Set(commands.map(cmd => cmd.projectSource))].filter(Boolean).map((source, index) => {
              const sourceCommands = commands.filter(cmd => cmd.projectSource === source);
              return (
                <div
                  key={source}
                  className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{source}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Commands and scripts from {source}</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">{sourceCommands.length} commands</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Categories: {[...new Set(sourceCommands.map(cmd => cmd.category))].join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => setProgressionFilter(source || '')}
                    className="mt-4 w-full px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors duration-200 border border-blue-500/30"
                  >
                    View Commands
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Command Modal */}
        {isAddingCommand && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-600/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Add New Command</h3>
                <button
                  onClick={() => setIsAddingCommand(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={newCommand.category || 'system'}
                      onChange={(e) => setNewCommand(prev => ({ ...prev, category: e.target.value as CommandCategory }))}
                      className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.keys(categoryIcons).map(category => (
                        <option key={category} value={category}>
                          {categoryIcons[category as keyof typeof categoryIcons]} {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                    <select
                      value={newCommand.difficulty || 'beginner'}
                      onChange={(e) => setNewCommand(prev => ({ ...prev, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                      className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Command *</label>
                  <input
                    type="text"
                    value={newCommand.command || ''}
                    onChange={(e) => setNewCommand(prev => ({ ...prev, command: e.target.value }))}
                    placeholder="e.g., ls -la"
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                  <textarea
                    value={newCommand.description || ''}
                    onChange={(e) => setNewCommand(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of what this command does"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Example</label>
                  <input
                    type="text"
                    value={newCommand.example || ''}
                    onChange={(e) => setNewCommand(prev => ({ ...prev, example: e.target.value }))}
                    placeholder="e.g., ls -la /var/www"
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newCommand.tags?.join(', ') || ''}
                    onChange={(e) => setNewCommand(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }))}
                    placeholder="e.g., files, listing, directory"
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Source</label>
                  <input
                    type="text"
                    value={newCommand.projectSource || ''}
                    onChange={(e) => setNewCommand(prev => ({ ...prev, projectSource: e.target.value }))}
                    placeholder="e.g., ForexAcuity, Personal Learning"
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddingCommand(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCommand}
                  disabled={!newCommand.command || !newCommand.description}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Add Command
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
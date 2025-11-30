import { useState, useEffect } from 'react';
import {
  Globe,
  MousePointerClick,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  RefreshCw,
  Users,
  FileDown
} from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface UserSession {
  id: string;
  session_id: string;
  stock_code: string;
  stock_name: string;
  url_params: Record<string, string>;
  first_visit_at: string;
  converted: number;
  converted_at: string | null;
  events?: UserEvent[];
}

interface UserEvent {
  id: string;
  event_type: string;
  event_data: Record<string, any>;
  stock_code: string;
  stock_name: string;
  duration_ms: number | null;
  gclid: string | null;
  created_at: string;
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [events, setEvents] = useState<Record<string, UserEvent[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConverted, setFilterConverted] = useState<'all' | 'converted' | 'not_converted'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    loadSessions(currentPage);
  }, [currentPage]);

  const loadSessions = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const response = await apiClient.get(`/api/admin/sessions?days=7&limit=${pageSize}&offset=${offset}`);
      const data = await response.json();

      if (data.sessions) {
        setSessions(data.sessions);
        setTotalSessions(data.total || 0);

        const eventsBySession: Record<string, UserEvent[]> = {};
        data.sessions.forEach(session => {
          if (session.events) {
            eventsBySession[session.session_id] = session.events;
          }
        });
        setEvents(eventsBySession);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('确定要删除这个会话吗？')) return;

    try {
      const response = await apiClient.delete(`/api/admin/sessions/${sessionId}`);
      if (response.ok) {
        await loadSessions(currentPage);
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
      alert('删除失败');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('确定要清除所有会话吗？此操作不可恢复！')) return;

    try {
      const response = await apiClient.delete('/api/admin/sessions?confirm=true');
      if (response.ok) {
        setCurrentPage(1);
        await loadSessions(1);
      } else {
        alert('清除失败');
      }
    } catch (error) {
      console.error('Failed to clear sessions:', error);
      alert('清除失败');
    }
  };

  const handleRefresh = () => {
    loadSessions(currentPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredSessions = sessions.filter(session => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        session.stock_code?.toLowerCase().includes(searchLower) ||
        session.stock_name?.toLowerCase().includes(searchLower) ||
        session.url_params?.gclid?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Conversion filter
    if (filterConverted === 'converted' && !session.converted) return false;
    if (filterConverted === 'not_converted' && session.converted) return false;

    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
        <p className="mt-4 text-slate-600">加载会话数据...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索股票代码、股票名称或gclid..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Conversion Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <select
              value={filterConverted}
              onChange={(e) => setFilterConverted(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            >
              <option value="all">全部会话</option>
              <option value="converted">已转化</option>
              <option value="not_converted">未转化</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            用户会话 ({totalSessions})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              刷新
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              disabled={totalSessions === 0}
            >
              <Trash2 className="w-4 h-4" />
              清除所有会话
            </button>
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 mb-2">
              {sessions.length === 0 ? '暂无用户会话数据' : '没有找到匹配的会话'}
            </p>
            {sessions.length === 0 && (
              <p className="text-sm text-slate-500">
                用户访问网站后会自动记录会话数据
              </p>
            )}
          </div>
        ) : (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              events={events[session.session_id] || []}
              isExpanded={expandedSessions.has(session.session_id)}
              onToggle={() => toggleSession(session.session_id)}
              onDelete={() => handleDeleteSession(session.session_id)}
            />
          ))
        )}

        {/* Pagination */}
        {totalSessions > pageSize && (
          <div className="flex items-center justify-between mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="text-sm text-slate-600">
              显示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalSessions)} / 共 {totalSessions} 条
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-4 py-2 text-slate-700">
                第 {currentPage} / {Math.ceil(totalSessions / pageSize)} 页
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalSessions / pageSize)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: UserSession;
  events: UserEvent[];
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

function SessionCard({ session, events, isExpanded, onToggle, onDelete }: SessionCardProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Session Header */}
      <div
        onClick={onToggle}
        className="p-4 cursor-pointer hover:bg-slate-50 transition"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-300 rounded-lg">
                {session.stock_code ? (
                  <>
                    <span className="font-bold text-blue-900 text-base">
                      {session.stock_code}
                    </span>
                    <span className="font-semibold text-blue-700">
                      {session.stock_name}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-blue-700">
                    未选择股票
                  </span>
                )}
              </div>
              {session.converted ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  <CheckCircle className="w-3 h-3" />
                  已转化
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(session.first_visit_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>来源: {session.url_params?.src || '直接访问'}</span>
              </div>
              {session.url_params?.gclid && (
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-mono text-xs">
                    {session.url_params.gclid.substring(0, 12)}...
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="删除会话"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session Timeline */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900 mb-4">用户行为时间线</h4>
          <div className="space-y-3">
            {events.map((event, index) => (
              <EventItem key={event.id} event={event} isLast={index === events.length - 1} />
            ))}
            {events.length === 0 && (
              <p className="text-sm text-slate-600 text-center py-4">暂无事件记录</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface EventItemProps {
  event: UserEvent;
  isLast: boolean;
}

function EventItem({ event, isLast }: EventItemProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'page_load':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'diagnosis_click':
        return <MousePointerClick className="w-5 h-5 text-purple-600" />;
      case 'report_download':
        return <FileDown className="w-5 h-5 text-orange-600" />;
      case 'conversion':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getEventTitle = (type: string) => {
    switch (type) {
      case 'page_load':
        return '加载网站';
      case 'diagnosis_click':
        return '诊断股票';
      case 'report_download':
        return '下载报告';
      case 'conversion':
        return '转化成功';
      default:
        return type;
    }
  };

  const getEventBgColor = (type: string) => {
    switch (type) {
      case 'page_load':
        return 'bg-blue-100 border-blue-300';
      case 'diagnosis_click':
        return 'bg-purple-100 border-purple-300';
      case 'report_download':
        return 'bg-orange-100 border-orange-300';
      case 'conversion':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-slate-100 border-slate-300';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`p-2 rounded-lg border-2 ${getEventBgColor(event.event_type)}`}>
          {getEventIcon(event.event_type)}
        </div>
        {!isLast && <div className="flex-1 w-0.5 bg-slate-300 mt-2" style={{ minHeight: '24px' }} />}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h5 className="font-semibold text-slate-900">{getEventTitle(event.event_type)}</h5>
          <span className="text-xs text-slate-500">{formatTime(event.created_at)}</span>
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          {event.event_type === 'page_load' && (
            <>
              <p>股票代码: <span className="font-semibold">{event.stock_code}</span></p>
              <p>股票名称: <span className="font-semibold">{event.stock_name}</span></p>
              {event.event_data?.url && (
                <p className="text-xs break-all">URL: {event.event_data.url}</p>
              )}
            </>
          )}
          {event.event_type === 'diagnosis_click' && (
            <>
              <p>股票名称: <span className="font-semibold">{event.stock_name}</span></p>
              {event.duration_ms && (
                <p>加载时长: <span className="font-semibold">{(event.duration_ms / 1000).toFixed(2)}秒</span></p>
              )}
            </>
          )}
          {event.event_type === 'report_download' && (
            <>
              <p>股票名称: <span className="font-semibold">{event.stock_name}</span></p>
              {event.event_data?.reportFormat && (
                <p>报告格式: <span className="font-semibold uppercase">{event.event_data.reportFormat}</span></p>
              )}
            </>
          )}
          {event.event_type === 'conversion' && (
            <>
              {event.gclid && (
                <p>GCLID: <span className="font-mono text-xs">{event.gclid}</span></p>
              )}
              <p>转换时间: <span className="font-semibold">{formatTime(event.created_at)}</span></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

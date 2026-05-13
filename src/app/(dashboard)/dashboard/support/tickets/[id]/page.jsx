"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const TicketChatPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`/api/support/tickets/${id}`);
      setTicket(res.data);
    } catch (error) {
      console.error("Failed to fetch ticket:", error);
      toast.error("Ticket not found or unauthorized");
      router.push("/dashboard/support");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      const newStatus = e.target.value;
      const res = await axios.patch(`/api/support/tickets/${id}`, { status: newStatus });
      if (res.status === 200) {
        toast.success(`Ticket marked as ${newStatus}`);
        setTicket({ ...ticket, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update ticket status");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    
    setIsSending(true);
    try {
      const res = await axios.post(`/api/support/tickets/${id}/reply`, { message: replyMessage });
      if (res.status === 201) {
        toast.success("Reply sent");
        setTicket({
          ...ticket,
          replies: [...(ticket.replies || []), res.data]
        });
        setReplyMessage("");
      }
    } catch (error) {
      console.error("Failed to post reply:", error);
      toast.error("Failed to send reply");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-400 font-medium">Loading ticket details...</div>;
  if (!ticket) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <Link href="/dashboard/support" className="text-indigo-600 text-sm font-bold flex items-center gap-2 mb-4 hover:underline">
            ← Back to Tickets
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-gray-900">{ticket.subject}</h1>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                ticket.priority === 'urgent' ? 'bg-red-50 text-red-600' :
                ticket.priority === 'high' ? 'bg-orange-50 text-orange-600' :
                ticket.priority === 'medium' ? 'bg-blue-50 text-blue-600' :
                'bg-gray-100 text-gray-600'
            }`}>
                {ticket.priority} Priority
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Reported by <span className="font-bold text-gray-900">{ticket.user_name}</span> ({ticket.user_email}) on {new Date(ticket.created_at).toLocaleString()}
          </p>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ticket Status</label>
            <select 
                className={`px-4 py-3 border rounded-xl outline-none font-bold text-sm shadow-sm transition-colors ${
                    ticket.status === 'open' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    ticket.status === 'in_progress' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                    ticket.status === 'resolved' ? 'bg-green-50 border-green-100 text-green-600' :
                    'bg-gray-50 border-gray-200 text-gray-600'
                }`}
                value={ticket.status}
                onChange={handleStatusChange}
            >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
            </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Original Message */}
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">{ticket.user_name[0]}</span>
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-tl-none p-5 max-w-[80%] border border-gray-100">
                    <div className="flex justify-between items-baseline mb-2 gap-4">
                        <span className="font-bold text-gray-900 text-sm">{ticket.user_name}</span>
                        <span className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{ticket.message}</p>
                </div>
            </div>

            {/* Replies */}
            {ticket.replies && ticket.replies.map((reply) => {
                const isSupport = ['admin', 'manager', 'support'].includes(reply.user_role);
                return (
                    <div key={reply.reply_id} className={`flex gap-4 ${isSupport ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${isSupport ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                            <span className="font-bold">{reply.user_name ? reply.user_name[0] : '?'}</span>
                        </div>
                        <div className={`rounded-2xl p-5 max-w-[80%] border ${
                            isSupport 
                            ? 'bg-indigo-50 border-indigo-100 rounded-tr-none' 
                            : 'bg-gray-50 border-gray-100 rounded-tl-none'
                        }`}>
                            <div className="flex justify-between items-baseline mb-2 gap-4">
                                <span className={`font-bold text-sm ${isSupport ? 'text-indigo-900' : 'text-gray-900'}`}>
                                    {reply.user_name} {isSupport && <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded ml-2 uppercase tracking-wider">Staff</span>}
                                </span>
                                <span className={`text-xs ${isSupport ? 'text-indigo-400' : 'text-gray-400'}`}>
                                    {new Date(reply.created_at).toLocaleString()}
                                </span>
                            </div>
                            <p className={`text-sm whitespace-pre-wrap ${isSupport ? 'text-indigo-800' : 'text-gray-700'}`}>
                                {reply.message}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Reply Input */}
        {ticket.status !== 'closed' ? (
            <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-[2.5rem]">
                <form onSubmit={handleReply} className="flex gap-4">
                    <textarea 
                        className="flex-1 bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-indigo-600 transition-colors resize-none h-20"
                        placeholder="Type your reply here..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleReply(e);
                            }
                        }}
                    />
                    <button 
                        type="submit"
                        disabled={isSending || !replyMessage.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-2xl shadow-lg shadow-indigo-100 transition-all disabled:opacity-50 self-end h-20"
                    >
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-2 italic px-2">Press Enter to send, Shift+Enter for new line.</p>
            </div>
        ) : (
            <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-[2.5rem] text-center">
                <p className="text-gray-500 font-bold">This ticket is closed and cannot receive new replies.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default TicketChatPage;

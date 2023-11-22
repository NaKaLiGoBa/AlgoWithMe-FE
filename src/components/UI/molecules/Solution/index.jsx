import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import {
  setActiveTab,
  removeTab,
  updateTabContent,
} from '../../../../store/tabState';
import {
  fetchSolution,
  updateSolution,
  deleteSolution,
  likeSolution,
} from '../../../../utils/fetchSolution';
import Button from '../../atoms/Input/Button';
import CommentsSection from '../CommentsSection';
import LikeButton from '../../atoms/Input/LikeButton';
import {
  selectActiveSolutionId,
  setActiveSolutionId,
} from '../../../../store/SolutionsSlice';

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const { problemId } = useParams();

  const handleUpdate = async () => {
    if (window.confirm('정말로 수정하시겠습니까?')) {
      navigate(
        `/edit/${problemId}/solution/${activeTab.data.solution.id}/edit`,
      ); // 그냥 이동?
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        console.log(activeTab);
        const response = await deleteSolution(
          problemId,
          activeTab.data.solution.id,
          authToken,
        );
        alert('풀이 글 삭제 완료');
        console.log('Delete successful', response);

        // 삭제 후 행동
        dispatch(removeTab({ id: activeTab.id }));
        navigate(`/problems/${problemId}`);
      } catch (error) {
        console.error('Error deleting solution:', error);
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeSolution(
        problemId,
        solutionData.solution.id,
        authToken,
      );
      setLikes(response.likeCount);
      setIsLiked(response.isLike);
    } catch (error) {
      console.error('Error liking the solution:', error);
    }
  };

  return <div>여기에 solution detail</div>;
}

const contentTemplate = `# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
\`\`\`
import java.util.Arrays;

class Solution {
    public int getLastMoment(int n, int[] left, int[] right) {
        int maxLeft = left.length == 0 ? 0 : Arrays.stream(left).max().getAsInt();
        int minRight = right.length == 0 ? n : Arrays.stream(right).min().getAsInt();
        return Math.max(maxLeft, n - minRight);
    }
}
\`\`\``;

export default contentTemplate;

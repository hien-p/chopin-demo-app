"use client";

import { PastSpeedTestResult } from '../../lib/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Button } from '../../../../components/ui/button';

interface PastResultsTableProps {
  pastResults: PastSpeedTestResult[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
  };
  fetchPastResults: (page: number) => void;
  isFetchingPastResults: boolean;
}

export default function PastResultsTable({
  pastResults,
  pagination,
  fetchPastResults,
  isFetchingPastResults
}: PastResultsTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Download (Mbps)</TableHead>
            <TableHead className="text-right">Upload (Mbps)</TableHead>
            <TableHead className="text-right">Ping (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
              <TableCell>{result.location}</TableCell>
              <TableCell className="text-right">{result.download_speed.toFixed(2)}</TableCell>
              <TableCell className="text-right">{result.upload_speed.toFixed(2)}</TableCell>
              <TableCell className="text-right">{result.ping.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => fetchPastResults(pagination.page - 1)}
              disabled={pagination.page <= 1 || isFetchingPastResults}
            >
              Previous
            </Button>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => fetchPastResults(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isFetchingPastResults}
            >
              Next
            </Button>
          </div>
        </TableCaption>
      </Table>
    </div>
  );
} 
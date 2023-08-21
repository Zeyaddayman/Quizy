import { useSelector } from "react-redux";

function ResultsLog() {

    const results = useSelector((state) => state.results);

    return (
        <div className="relative overflow-x-auto">
            <table className="table-auto w-full mt-5 border-spacing-2 border-separate">
                <thead className='bg-red-300 text-white'>
                    <tr>
                        <th className='p-2 w-32'>Name</th>
                        <th className="p-2 w-16">Attemps</th>
                        <th className="p-2 w-16">Earn Points</th>
                        <th className="p-2 w-24">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id} className='text-center'>
                            <td className='p-2 whitespace-nowrap'>{result.username}</td>
                            <td className='p-2 whitespace-nowrap'>{result.totalAttempts}</td>
                            <td className='p-2 whitespace-nowrap'>{result.totalEarnPoints}</td>
                            <td className='p-2 whitespace-nowrap'>{result.isPassed ? 'Passed' : 'Failed'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResultsLog;
